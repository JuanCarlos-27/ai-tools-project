interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

export default function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  return (
    <div className="group">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all" style={{ borderRadius: '12px' }}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold text-slate-50">{value}</p>
            {subtitle && (
              <p className="text-xs text-slate-500">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                <svg className={`w-4 h-4 ${trend.isPositive ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400" style={{ borderRadius: '12px' }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
