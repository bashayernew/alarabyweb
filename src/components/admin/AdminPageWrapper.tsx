type AdminPageWrapperProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Optional actions (e.g. Add button) to show next to title */
  actions?: React.ReactNode;
};

export function AdminPageWrapper({
  title,
  subtitle,
  children,
  actions,
}: AdminPageWrapperProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        {actions && <div className="mt-2 sm:mt-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
