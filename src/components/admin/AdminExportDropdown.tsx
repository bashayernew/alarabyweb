"use client";

import { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, FileType, ChevronDown, Loader2, Copy, Check } from "lucide-react";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";
import type { ExportFormat } from "@/lib/admin-export";
import {
  toExcel,
  toCsv,
  toPdf,
  exportFilename,
  formatDate,
} from "@/lib/admin-export";

export type ExportSection =
  | "product-orders"
  | "service-requests"
  | "maintenance-orders"
  | "offer-requests"
  | "all-requests";

export interface ExportData {
  headers: string[];
  rows: (string | number | null | undefined)[][];
}

/** Get column index by header (case-insensitive) */
function getColIndex(headers: string[], name: string): number {
  const lower = name.toLowerCase();
  return headers.findIndex((h) => h.toLowerCase().includes(lower));
}

/** Extract emails from export data */
export function extractEmails(data: ExportData): string[] {
  const emailCol = getColIndex(data.headers, "email");
  if (emailCol < 0) return [];
  const emails = data.rows
    .map((r) => String(r[emailCol] ?? "").trim())
    .filter((e) => e && e.includes("@"));
  return [...new Set(emails)];
}

/** Extract phone numbers from export data (Phone or customerPhone column) */
export function extractPhones(data: ExportData): string[] {
  const phoneCol =
    getColIndex(data.headers, "phone") >= 0
      ? getColIndex(data.headers, "phone")
      : getColIndex(data.headers, "customerphone");
  if (phoneCol < 0) return [];
  const phones = data.rows
    .map((r) => String(r[phoneCol] ?? "").trim())
    .filter((p) => p && p.length >= 8);
  return [...new Set(phones)];
}

type AdminExportDropdownProps = {
  section: ExportSection;
  sectionTitle: string;
  data: ExportData;
  filteredData: ExportData;
  isFiltered: boolean;
  disabled?: boolean;
};

function useSectionLabels(t: (k: string) => string): Record<ExportSection, string> {
  return {
    "product-orders": t("dashboard.productOrders"),
    "service-requests": t("dashboard.serviceRequests"),
    "maintenance-orders": t("maintenance.ordersTitle"),
    "offer-requests": t("offerRequests.title"),
    "all-requests": t("dashboard.exportAll"),
  };
}

export function AdminExportDropdown({
  section,
  sectionTitle,
  data,
  filteredData,
  isFiltered,
  disabled = false,
}: AdminExportDropdownProps) {
  const { t } = useAdminLanguage();
  const SECTION_LABELS = useSectionLabels(t);
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const [copied, setCopied] = useState<"emails" | "phones" | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [mode, setMode] = useState<"all" | "filtered">(isFiltered ? "filtered" : "all");
  const exportData = mode === "filtered" ? filteredData : data;
  const exportLabel = mode === "filtered" ? t("export.filtered") : t("export.all");
  const hasBothModes = data.rows.length !== filteredData.rows.length || data.rows.length === 0;

  function doExport(format: ExportFormat) {
    setExporting(format);
    const base = exportFilename(section, isFiltered, format);
    const filename = `${base}`;

    try {
      if (format === "xlsx") {
        toExcel(
          SECTION_LABELS[section].slice(0, 31),
          exportData.headers,
          exportData.rows,
          filename
        );
      } else if (format === "csv") {
        toCsv(exportData.headers, exportData.rows, filename);
      } else if (format === "pdf") {
        toPdf(
          sectionTitle,
          `${SECTION_LABELS[section]} • ${exportLabel} • ${formatDate(new Date().toISOString())}`,
          exportData.headers,
          exportData.rows,
          filename
        );
      }
    } catch (e) {
      console.error(e);
      alert(t("errors.exportFailed"));
    } finally {
      setExporting(null);
      setOpen(false);
    }
  }

  const totalCount = exportData.rows.length;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled || totalCount === 0}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {t("export.exportButton")}
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 min-w-[240px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          {hasBothModes && (
            <div className="flex border-b border-slate-100 px-2 py-2">
              <button
                type="button"
                onClick={() => setMode("all")}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === "all" ? "bg-primary-100 text-primary-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t("export.all")} ({data.rows.length})
              </button>
              <button
                type="button"
                onClick={() => setMode("filtered")}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === "filtered" ? "bg-primary-100 text-primary-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t("export.filtered")} ({filteredData.rows.length})
              </button>
            </div>
          )}
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="text-xs font-medium text-slate-500">
              {t("export.exportRecords", { label: exportLabel, count: String(totalCount) })}
            </p>
          </div>
          <div className="py-1">
            <button
              type="button"
              onClick={() => doExport("xlsx")}
              disabled={!!exporting}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50"
            >
              {exporting === "xlsx" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              ) : (
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              )}
              <span>{t("export.excel")} (.xlsx)</span>
              <span className="ml-auto text-xs text-slate-400">{t("export.recommended")}</span>
            </button>
            <button
              type="button"
              onClick={() => doExport("csv")}
              disabled={!!exporting}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50"
            >
              {exporting === "csv" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              ) : (
                <FileText className="h-4 w-4 text-slate-500" />
              )}
              <span>{t("export.csv")} (.csv)</span>
            </button>
            <button
              type="button"
              onClick={() => doExport("pdf")}
              disabled={!!exporting}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700 disabled:opacity-50"
            >
              {exporting === "pdf" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              ) : (
                <FileType className="h-4 w-4 text-red-500" />
              )}
              <span>{t("export.pdf")} (.pdf)</span>
            </button>
          </div>
          <div className="border-t border-slate-100 px-2 py-2">
            <button
              type="button"
              onClick={async () => {
                const emails = extractEmails(exportData);
                if (emails.length === 0) {
                  alert(t("export.noEmails"));
                  return;
                }
                await navigator.clipboard.writeText(emails.join(", "));
                setCopied("emails");
                setTimeout(() => setCopied(null), 2000);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50"
            >
              {copied === "emails" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
              {t("export.copyEmails")}
            </button>
            <button
              type="button"
              onClick={async () => {
                const phones = extractPhones(exportData);
                if (phones.length === 0) {
                  alert(t("export.noPhones"));
                  return;
                }
                await navigator.clipboard.writeText(phones.join(", "));
                setCopied("phones");
                setTimeout(() => setCopied(null), 2000);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50"
            >
              {copied === "phones" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
              {t("export.copyPhones")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
