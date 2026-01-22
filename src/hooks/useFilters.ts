import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Tool, FilterState } from '../types';

const initialFilters: FilterState = {
  category: '',
  pricingModel: '',
  industryUse: '',
  skillLevel: '',
  openSource: '',
  searchQuery: ''
};

export function useFilters(tools: Tool[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL params
  const getInitialFilters = useCallback(
    (): FilterState => ({
      category: searchParams.get('category') || '',
      pricingModel: searchParams.get('pricing') || '',
      industryUse: searchParams.get('industry') || '',
      skillLevel: searchParams.get('skill') || '',
      openSource: searchParams.get('openSource') || '',
      searchQuery: searchParams.get('search') || ''
    }),
    [searchParams]
  );

  const [filters, setFilters] = useState<FilterState>(getInitialFilters);

  // Sync URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.pricingModel) params.set('pricing', filters.pricingModel);
    if (filters.industryUse) params.set('industry', filters.industryUse);
    if (filters.skillLevel) params.set('skill', filters.skillLevel);
    if (filters.openSource) params.set('openSource', filters.openSource);
    if (filters.searchQuery) params.set('search', filters.searchQuery);

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = !filters.category || tool.AI_Category === filters.category;
      const matchesPricing = !filters.pricingModel || tool.Pricing_Model === filters.pricingModel;
      const matchesIndustry = !filters.industryUse || tool.Industry_Use === filters.industryUse;
      const matchesSkill = !filters.skillLevel || tool.Skill_Level === filters.skillLevel;
      const matchesOpenSource = !filters.openSource || tool.Open_Source === filters.openSource;
      const matchesSearch =
        !filters.searchQuery ||
        tool.Tool_Name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        tool.AI_Category.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        tool.Use_Cases.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesPricing &&
        matchesIndustry &&
        matchesSkill &&
        matchesOpenSource &&
        matchesSearch
      );
    });
  }, [tools, filters]);

  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter((v) => v !== '').length;
  }, [filters]);

  return {
    filters,
    filteredTools,
    updateFilter,
    resetFilters,
    activeFiltersCount
  };
}
