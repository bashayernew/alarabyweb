type AdminCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function AdminCard({ title, children, className = "" }: AdminCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {title && (
        <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
