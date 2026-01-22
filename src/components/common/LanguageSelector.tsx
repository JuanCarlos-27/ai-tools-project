import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: 'rgba(33, 33, 55, 0.5)', borderRadius: '10px' }}>
      <button
        onClick={() => changeLanguage('en')}
        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
        style={{
          backgroundColor: i18n.language === 'en' ? 'var(--color-primary)' : 'transparent',
          color: i18n.language === 'en' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          borderRadius: '8px',
          boxShadow: i18n.language === 'en' ? '0 2px 4px -1px rgba(0, 211, 192, 0.2)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (i18n.language !== 'en') {
            e.currentTarget.style.color = 'var(--color-text-primary)';
            e.currentTarget.style.backgroundColor = 'rgba(42, 42, 69, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (i18n.language !== 'en') {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
        style={{
          backgroundColor: i18n.language === 'es' ? 'var(--color-primary)' : 'transparent',
          color: i18n.language === 'es' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          borderRadius: '8px',
          boxShadow: i18n.language === 'es' ? '0 2px 4px -1px rgba(0, 211, 192, 0.2)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (i18n.language !== 'es') {
            e.currentTarget.style.color = 'var(--color-text-primary)';
            e.currentTarget.style.backgroundColor = 'rgba(42, 42, 69, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (i18n.language !== 'es') {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        ES
      </button>
    </div>
  );
}
