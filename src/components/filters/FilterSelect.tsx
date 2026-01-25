import { useTranslation } from 'react-i18next';

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export default function FilterSelect({ label, value, options, onChange, icon }: FilterSelectProps) {
  const { t } = useTranslation();

  // Map label to translation key
  const getLabelKey = (label: string) => {
    const labelMap: Record<string, string> = {
      'Category': 'allCategory',
      'Pricing': 'allPricing',
      'Industry': 'allIndustry',
      'Primary Task': 'allTask',
      'Popular Among': 'allAudience',
      // Spanish labels
      'Categoría': 'allCategory',
      'Precio': 'allPricing',
      'Industria': 'allIndustry',
      'Tarea Principal': 'allTask',
      'Popular Entre': 'allAudience'
    };
    return labelMap[label] || 'allCategory';
  };

  return (
    <div className="group">
      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-secondary)' }}>
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full appearance-none rounded-lg py-2.5 pr-10 text-sm font-medium
            focus:outline-none transition-all duration-200 cursor-pointer
            ${icon ? 'pl-10' : 'pl-4'}
          `}
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            borderRadius: '10px'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-primary-light)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <option value="">{t(`filters.${getLabelKey(label)}`)}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-secondary)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
