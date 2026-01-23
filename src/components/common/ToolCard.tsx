import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Tool } from '../../types';

interface ToolCardProps {
  tool: Tool;
}

const getCategoryColor = (category: string): string => {
  // Using Power BI theme colors
  const colors: Record<string, string> = {
    'Large Language Model': '#4083AD',
    'AI Coding Assistant': '#00D3C0',
    'Image Generation': '#4E7CFF',
    'Music Generation': '#DC7653',
    'Video Generation': '#22C0FF',
    'Cybersecurity AI': '#F65164',
    'Healthcare AI': '#00D3C0',
    'Finance AI': '#DC7653',
    'Chatbot Platform': '#4083AD',
    'Data Analytics AI': '#22C0FF',
    'Speech Recognition': '#00D3C0',
    'Legal AI': '#4E7CFF',
    'Education AI': '#00D3C0',
    'Marketing AI': '#DC7653',
    'AI for Design': '#4083AD',
    'Agriculture AI': '#00D3C0',
    'Translation AI': '#22C0FF',
    'Sentiment Analysis': '#4083AD',
    'Autonomous Vehicles': '#717A90',
  };
  return colors[category] || '#4083AD';
};

const getPricingBadgeColor = (pricing: string): string => {
  const colors: Record<string, string> = {
    'Free': '#00D3C0',
    'Freemium': '#4083AD',
    'Free Trial': '#22C0FF',
    'Subscription': '#4E7CFF',
    'Pay-per-use': '#DC7653',
    'Enterprise': '#717A90',
    'Open Source': '#00D3C0',
  };
  return colors[pricing] || '#717A90';
};

export default function ToolCard({ tool }: ToolCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="group">
      <div
        className="rounded-lg overflow-hidden transition-all"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          border: `1px solid ${isHovered ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: '13px',
          boxShadow: isHovered ? '0 4px 6px -1px rgba(0, 211, 192, 0.1)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div style={{ height: '3px', background: `linear-gradient(to right, ${getCategoryColor(tool.AI_Category)}, var(--color-primary))` }}></div>

        <div className="p-5">
          {/* Title and Badges */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-base font-bold transition-colors" style={{ color: isHovered ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
                {tool.Tool_Name}
              </h3>
              <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-text-secondary)' }}>{tool.AI_Category}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="shrink-0 px-2 py-1 text-xs font-semibold rounded"
                style={{
                  backgroundColor: `${getPricingBadgeColor(tool.Pricing_Model)}20`,
                  color: getPricingBadgeColor(tool.Pricing_Model),
                  border: `1px solid ${getPricingBadgeColor(tool.Pricing_Model)}`,
                  borderRadius: '8px'
                }}
              >
                {tool.Pricing_Model}
              </span>
              {tool.Release_Year && (
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {tool.Release_Year}
                </span>
              )}
            </div>
          </div>

          {/* Primary Task */}
          <p className="text-sm mb-3 font-medium" style={{ color: 'var(--color-text-primary)' }}>{tool.Primary_Task}</p>

          {/* Tags - Limited to 2 + Open Source badge */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)', borderRadius: '8px' }}>
              {tool.Modality}
            </span>
            <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)', borderRadius: '8px' }}>
              {tool.Industry_Use}
            </span>
            {tool.Open_Source === 'Yes' && (
              <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: '#00D3C020', color: '#00D3C0', borderRadius: '8px' }}>
                {t('toolCard.openSource')}
              </span>
            )}
          </div>

          {/* Expandable Details Content */}
          {isExpanded && (
            <div className="mb-4 space-y-3">
              {/* Popular Among */}
              {tool.Popular_Among && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)' }}>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('toolCard.popularAmong')}:</span> {tool.Popular_Among}
                  </span>
                </div>
              )}

              {/* Skill Level */}
              {tool.Skill_Level && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#4E7CFF' }}>
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('toolCard.skillLevel')}:</span> {tool.Skill_Level}
                  </span>
                </div>
              )}

              {/* Use Cases */}
              {tool.Common_Use_Cases && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#22C0FF' }}>
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('toolCard.useCases')}</span>
                  </div>
                  <p className="text-xs pl-5" style={{ color: 'var(--color-text-secondary)' }}>{tool.Common_Use_Cases}</p>
                </div>
              )}

              {/* Strengths */}
              {tool.Strengths && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#00D3C0' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-xs font-semibold" style={{ color: '#00D3C0' }}>{t('toolCard.strengths')}</span>
                  </div>
                  <p className="text-xs pl-5" style={{ color: 'var(--color-text-secondary)' }}>{tool.Strengths}</p>
                </div>
              )}

              {/* Limitations */}
              {tool.Limitations && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#F65164' }}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span className="text-xs font-semibold" style={{ color: '#F65164' }}>{t('toolCard.limitations')}</span>
                  </div>
                  <p className="text-xs pl-5" style={{ color: 'var(--color-text-secondary)' }}>{tool.Limitations}</p>
                </div>
              )}
            </div>
          )}

          {/* Footer - Show details toggle and Visit button */}
          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              <svg
                className="w-3.5 h-3.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {isExpanded ? t('toolCard.hideDetails') : t('toolCard.showDetails')}
            </button>

            <button
              type='button'
              className="cursor-pointer flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-all"
              style={{
                backgroundColor: 'var(--color-bg-hover)',
                color: 'var(--color-primary)',
                borderRadius: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onClick={() => {
                // TODO: Replace with actual website URL when available
                // window.open(tool.Website_URL, '_blank');
              }}
              title={t('toolCard.visitWebsite')}
            >
              {t('toolCard.visitWebsite')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
