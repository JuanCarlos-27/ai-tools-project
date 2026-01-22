import { useTranslation } from 'react-i18next';
import type { Tool } from '../types';

interface DashboardProps {
  tools: Tool[];
}

export default function Dashboard({ tools }: DashboardProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {t('dashboard.title')}
        </h1>
        <p className="mt-2 sm:mt-3 mx-auto max-w-2xl text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
          {t('dashboard.description', { count: tools.length })}
        </p>
      </div>

      {/* Power BI Embedded Dashboard */}
      <div className="w-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '13px' }}>
        <iframe
          title={t('dashboard.iframeTitle')}
          width="100%"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=cbfa469a-513d-4030-bff6-c0ac88f36d6a&autoAuth=true&ctid=b1ba85eb-a253-4467-9ee8-d4f8ed4df300&filterPaneEnabled=false&navContentPaneEnabled=false"
          allowFullScreen
          style={{
            border: 'none',
            minHeight: '700px'
          }}
        />
      </div>

      {/* Info Note */}
      <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(33, 33, 55, 0.5)', border: '1px solid rgba(42, 42, 69, 0.5)', borderRadius: '13px' }}>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
              {t('dashboard.info1')}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              {t('dashboard.info2')}
            </p>
            <p className="text-xs mt-3 pt-3" style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid rgba(42, 42, 69, 0.5)' }}>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                <span>{t('dashboard.datasetSource')} </span>
                <a
                  href="https://www.kaggle.com/datasets/zulqarnain11/ai-tools-ecosystem-dataset-2024-2025/data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                >
                  {t('dashboard.datasetLink')}
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
