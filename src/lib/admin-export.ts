/**
 * Admin export utilities for Excel, CSV, and PDF.
 * Supports Arabic and English text, UTF-8 encoding.
 */

import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export type ExportFormat = "xlsx" | "csv" | "pdf";

export interface ExportColumn {
  key: string;
  header: string;
  width?: number;
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

/** Escape CSV value for proper Excel UTF-8 compatibility */
function escapeCsv(val: unknown): string {
  if (val == null || val === "") return "";
  const s = String(val).replace(/"/g, '""');
  return `"${s}"`;
}

/** Create CSV with UTF-8 BOM for Excel */
export function toCsv(
  headers: string[],
  rows: (string | number | null | undefined)[][],
  filename: string
): void {
  const BOM = "\uFEFF";
  const headerRow = headers.map(escapeCsv).join(",");
  const dataRows = rows
    .map((row) => row.map((cell) => escapeCsv(cell ?? "")).join(","))
    .join("\n");
  const csv = BOM + headerRow + "\n" + dataRows;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `${filename}.csv`);
}

/** Create Excel workbook and download */
export function toExcel(
  sheetName: string,
  headers: string[],
  rows: (string | number | null | undefined)[][],
  filename: string
): void {
  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const colWidths = headers.map((_, i) => {
    const maxLen = Math.max(
      headers[i]?.length ?? 10,
      ...rows.map((r) => String(r[i] ?? "").length)
    );
    return { wch: Math.min(maxLen + 2, 50) };
  });
  ws["!cols"] = colWidths;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31));
  XLSX.writeFile(wb, `${filename}.xlsx`, { bookType: "xlsx" });
}

/** Create PDF report and download */
export function toPdf(
  title: string,
  subtitle: string,
  headers: string[],
  rows: (string | number | null | undefined)[][],
  filename: string
): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(subtitle, 14, 22);
  doc.setTextColor(0, 0, 0);

  autoTable(doc, {
    head: [headers],
    body: rows.map((row) => row.map((c) => String(c ?? ""))),
    startY: 28,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [41, 107, 255], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 14, right: 14 },
    tableWidth: "auto",
  });

  doc.save(`${filename}.pdf`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Generate filename with date and optional filter hint */
export function exportFilename(
  section: string,
  filtered: boolean,
  _format: ExportFormat
): string {
  void _format; // Reserved for future use (e.g. extension in filename)
  const date = new Date().toISOString().slice(0, 10);
  const suffix = filtered ? "-filtered" : "";
  return `${section}${suffix}-${date}`;
}

/** Build export data from product orders */
export function productOrdersToExport(
  orders: Array<{
    id: string;
    customerName: string;
    email: string | null;
    phone: string;
    area: string | null;
    message: string | null;
    status: string;
    language: string;
    createdAt: string;
    product: { slug: string; titleEn: string; titleAr: string };
  }>
) {
  const headers = [
    "ID",
    "Request Type",
    "Date",
    "Product (EN)",
    "Product (AR)",
    "Customer",
    "Phone",
    "Email",
    "Area",
    "Notes",
    "Status",
    "Language",
  ];
  const rows = orders.map((o) => [
    o.id,
    "Product Order",
    formatDate(o.createdAt),
    o.product.titleEn,
    o.product.titleAr,
    o.customerName,
    o.phone,
    o.email ?? "",
    o.area ?? "",
    o.message ?? "",
    o.status,
    o.language,
  ]);
  return { headers, rows };
}

/** Build export data from service requests */
export function serviceRequestsToExport(
  requests: Array<{
    id: string;
    customerName: string;
    email: string | null;
    phone: string;
    area: string | null;
    message: string | null;
    status: string;
    language: string;
    createdAt: string;
    service: { slug: string; titleEn: string; titleAr: string };
  }>
) {
  const headers = [
    "ID",
    "Request Type",
    "Date",
    "Service (EN)",
    "Service (AR)",
    "Customer",
    "Phone",
    "Email",
    "Area",
    "Notes",
    "Status",
    "Language",
  ];
  const rows = requests.map((r) => [
    r.id,
    "Service Request",
    formatDate(r.createdAt),
    r.service.titleEn,
    r.service.titleAr,
    r.customerName,
    r.phone,
    r.email ?? "",
    r.area ?? "",
    r.message ?? "",
    r.status,
    r.language,
  ]);
  return { headers, rows };
}

/** Build export data from offer requests */
export function offerRequestsToExport(
  requests: Array<{
    id: string;
    offerTitleAr: string;
    offerTitleEn: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string | null;
    address: string | null;
    area: string | null;
    notes: string | null;
    status: string;
    createdAt: string;
  }>
) {
  const headers = [
    "ID",
    "Date",
    "Offer (EN)",
    "Offer (AR)",
    "Customer",
    "Phone",
    "Email",
    "Address",
    "Area",
    "Notes",
    "Status",
  ];
  const rows = requests.map((r) => [
    r.id,
    formatDate(r.createdAt),
    r.offerTitleEn,
    r.offerTitleAr,
    r.customerName,
    r.customerPhone,
    r.customerEmail ?? "",
    r.address ?? "",
    r.area ?? "",
    r.notes ?? "",
    r.status,
  ]);
  return { headers, rows };
}

/** Build export data from maintenance orders */
export function maintenanceOrdersToExport(
  orders: Array<{
    id: string;
    serviceTitleAr: string;
    serviceTitleEn: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string | null;
    address: string | null;
    area: string | null;
    preferredDate: string | null;
    preferredTime: string | null;
    notes: string | null;
    status: string;
    createdAt: string;
  }>
) {
  const headers = [
    "ID",
    "Date",
    "Service (EN)",
    "Service (AR)",
    "Customer",
    "Phone",
    "Email",
    "Address",
    "Area",
    "Preferred Date",
    "Preferred Time",
    "Notes",
    "Status",
  ];
  const rows = orders.map((o) => [
    o.id,
    formatDate(o.createdAt),
    o.serviceTitleEn,
    o.serviceTitleAr,
    o.customerName,
    o.customerPhone,
    o.customerEmail ?? "",
    o.address ?? "",
    o.area ?? "",
    o.preferredDate ?? "",
    o.preferredTime ?? "",
    o.notes ?? "",
    o.status,
  ]);
  return { headers, rows };
}

/** Combine all request types into one export with Request Type column */
export function combinedRequestsToExport(
  orders: Parameters<typeof productOrdersToExport>[0],
  requests: Parameters<typeof serviceRequestsToExport>[0],
  offerReqs: Parameters<typeof offerRequestsToExport>[0],
  maintOrders: Parameters<typeof maintenanceOrdersToExport>[0]
) {
  const headers = [
    "ID",
    "Request Type",
    "Date",
    "Item (EN)",
    "Item (AR)",
    "Customer",
    "Phone",
    "Email",
    "Address",
    "Area",
    "Notes",
    "Status",
    "Language",
  ];
  const rows: (string | number | null | undefined)[][] = [];

  orders.forEach((o) => {
    rows.push([
      o.id,
      "Product Order",
      formatDate(o.createdAt),
      o.product.titleEn,
      o.product.titleAr,
      o.customerName,
      o.phone,
      o.email ?? "",
      "",
      o.area ?? "",
      o.message ?? "",
      o.status,
      o.language,
    ]);
  });
  requests.forEach((r) => {
    rows.push([
      r.id,
      "Service Request",
      formatDate(r.createdAt),
      r.service.titleEn,
      r.service.titleAr,
      r.customerName,
      r.phone,
      r.email ?? "",
      "",
      r.area ?? "",
      r.message ?? "",
      r.status,
      r.language,
    ]);
  });
  offerReqs.forEach((r) => {
    rows.push([
      r.id,
      "Offer Request",
      formatDate(r.createdAt),
      r.offerTitleEn,
      r.offerTitleAr,
      r.customerName,
      r.customerPhone,
      r.customerEmail ?? "",
      r.address ?? "",
      r.area ?? "",
      r.notes ?? "",
      r.status,
      "",
    ]);
  });
  maintOrders.forEach((o) => {
    rows.push([
      o.id,
      "Maintenance Order",
      formatDate(o.createdAt),
      o.serviceTitleEn,
      o.serviceTitleAr,
      o.customerName,
      o.customerPhone,
      o.customerEmail ?? "",
      o.address ?? "",
      o.area ?? "",
      o.notes ?? "",
      o.status,
      "",
    ]);
  });

  return { headers, rows };
}
