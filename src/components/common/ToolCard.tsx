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
          </div>

          {/* Primary Task */}
          <p className="text-sm mb-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>{tool.Primary_Task}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)', borderRadius: '8px' }}>
              {tool.Modality}
            </span>
            <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)', borderRadius: '8px' }}>
              {tool.Industry_Use}
            </span>
            <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)', borderRadius: '8px' }}>
              {tool.Skill_Level}
            </span>
            {tool.Open_Source === 'Yes' && (
              <span className="px-2 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: '#00D3C020', color: '#00D3C0', borderRadius: '8px' }}>
                {t('toolCard.openSource')}
              </span>
            )}
          </div>

          {/* Use Cases */}
          <p className="text-xs line-clamp-2 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            {tool.Common_Use_Cases}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#9CA3AF' }}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              {tool.Region_Origin}
            </div>
            <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>{tool.Deployment_Type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
