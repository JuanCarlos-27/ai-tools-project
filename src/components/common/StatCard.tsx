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
      <div
        className="rounded-lg p-6 border transition-all"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
          borderRadius: '12px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
          e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.backgroundColor = 'var(--color-bg-card)';
        }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>{title}</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{value}</p>
            {subtitle && (
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`} style={{ color: trend.isPositive ? 'var(--color-good)' : 'var(--color-bad)' }}>
                <svg className={`w-4 h-4 ${trend.isPositive ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '12px' }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
