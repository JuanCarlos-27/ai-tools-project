import { useTranslation } from 'react-i18next';
import { ToolCard } from '../components/common';
import { FilterSelect, SearchInput } from '../components/filters';
import { useFilters } from '../hooks/useFilters';
import type { Tool } from '../types';

interface ExplorerProps {
  tools: Tool[];
}

function getCategories(tools: Tool[]) {
  return Array.from(new Set(tools.map(t => t.AI_Category))).sort();
}

function getPricingModels(tools: Tool[]) {
  return Array.from(new Set(tools.map(t => t.Pricing_Model))).sort();
}

function getIndustries(tools: Tool[]) {
  return Array.from(new Set(tools.map(t => t.Industry_Use))).sort();
}

function getPrimaryTasks(tools: Tool[]) {
  return Array.from(new Set(tools.map(t => t.Primary_Task))).sort();
}

function getPopularAmong(tools: Tool[]) {
  const audiences = new Set<string>();
  tools.forEach(t => {
    t.Popular_Among.split(',').forEach(audience => {
      const trimmed = audience.trim();
      if (trimmed) audiences.add(trimmed);
    });
  });
  return Array.from(audiences).sort();
}

export default function Explorer({ tools }: ExplorerProps) {
  const { t } = useTranslation();
  const {
    filters,
    filteredTools,
    updateFilter,
    resetFilters,
    activeFiltersCount
  } = useFilters(tools);

  const categories = getCategories(tools);
  const pricingModels = getPricingModels(tools);
  const industries = getIndustries(tools);
  const primaryTasks = getPrimaryTasks(tools);
  const audiences = getPopularAmong(tools);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{t('explorer.title')}</h1>
          <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {t('explorer.description', { count: tools.length })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {t('explorer.showing')} <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{filteredTools.length}</span> {t('explorer.tools')}
          </span>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors font-medium"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-card)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t('explorer.clearFilters', { count: activeFiltersCount })}
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <div className="rounded-lg p-4 sm:p-6 overflow-x-auto" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '13px', boxShadow: '0 1px 3px var(--color-shadow)' }}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--color-text-primary)' }}>{t('explorer.filtersTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
              {t('explorer.searchLabel')}
            </label>
            <SearchInput
              value={filters.searchQuery}
              onChange={(value) => updateFilter('searchQuery', value)}
              placeholder={t('explorer.searchPlaceholder')}
            />
          </div>
          <FilterSelect
            label={t('explorer.categoryLabel')}
            value={filters.category}
            options={categories}
            onChange={(value) => updateFilter('category', value)}
          />
          <FilterSelect
            label={t('explorer.pricingLabel')}
            value={filters.pricingModel}
            options={pricingModels}
            onChange={(value) => updateFilter('pricingModel', value)}
          />
          <FilterSelect
            label={t('explorer.industryLabel')}
            value={filters.industryUse}
            options={industries}
            onChange={(value) => updateFilter('industryUse', value)}
          />
          <FilterSelect
            label={t('explorer.taskLabel')}
            value={filters.primaryTask}
            options={primaryTasks}
            onChange={(value) => updateFilter('primaryTask', value)}
          />
          <FilterSelect
            label={t('explorer.audienceLabel')}
            value={filters.popularAmong}
            options={audiences}
            onChange={(value) => updateFilter('popularAmong', value)}
          />
        </div>

        {/* Quick Filters */}
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs self-center mr-2" style={{ color: 'var(--color-text-secondary)' }}>{t('explorer.quickFiltersTitle')}:</span>
            {['Free', 'Freemium', 'Paid'].map((pricing) => (
              <button
                key={pricing}
                onClick={() => updateFilter('pricingModel', filters.pricingModel === pricing ? '' : pricing)}
                className="px-3 py-1 text-xs rounded transition-all"
                style={{
                  backgroundColor: filters.pricingModel === pricing ? 'var(--color-primary)' : 'var(--color-bg-card)',
                  color: filters.pricingModel === pricing ? '#000000' : 'var(--color-text-secondary)',
                  border: filters.pricingModel === pricing ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              >
                {t(`explorer.${pricing.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.Tool_ID} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '50%' }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-text-secondary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{t('explorer.noResults')}</h3>
          <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>{t('explorer.noResultsDesc')}</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded transition-colors font-medium"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#000000',
              borderRadius: '10px'
            }}
          >
            {t('explorer.resetFilters')}
          </button>
        </div>
      )}
    </div>
  );
}
