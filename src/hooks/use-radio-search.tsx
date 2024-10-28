import { useState, useEffect } from "react";
import { getRadios } from "@/services/api/radios";
import useDebounce from "@/hooks/use-debounce";
import { RadioSearchState, SearchParams } from "@/interfaces/search-params";

const ITEMS_PER_PAGE = 10;

export function useRadioSearch() {
  const [state, setState] = useState<RadioSearchState>({
    simpleSearch: "",
    advancedParams: { name: "", country: "", language: "" },
    loading: false,
    radios: [],
    hasMore: false,
    offset: 0,
  });

  const debouncedSimpleSearch = useDebounce(state.simpleSearch.trim(), 500);

  const handleSearch = async (params: SearchParams) => {
    const hasValidParams = Object.values(params).some((value) => value.trim());
    if (!hasValidParams) {
      setState((prev) => ({ ...prev, radios: [], loading: false }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    const result = await getRadios({ ...params, offset: 0 });
    setState((prev) => ({
      ...prev,
      radios: result,
      hasMore: result.length === ITEMS_PER_PAGE,
      offset: 0,
      loading: false,
    }));
  };

  useEffect(() => {
    if (!debouncedSimpleSearch) {
      setState((prev) => ({ ...prev, radios: [] }));
      return;
    }

    handleSearch({ name: debouncedSimpleSearch, country: "", language: "" });
  }, [debouncedSimpleSearch]);

  const loadMore = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const nextOffset = state.offset + ITEMS_PER_PAGE;
    const result = await getRadios({
      ...state.advancedParams,
      offset: nextOffset,
    });

    setState((prev) => ({
      ...prev,
      radios: [...prev.radios, ...result],
      offset: nextOffset,
      hasMore: result.length === ITEMS_PER_PAGE,
      loading: false,
    }));
  };

  return {
    ...state,
    handleSimpleSearchChange: (value: string) =>
      setState((prev) => ({ ...prev, simpleSearch: value })),
    handleAdvancedParamChange: (field: keyof SearchParams, value: string) =>
      setState((prev) => ({
        ...prev,
        advancedParams: { ...prev.advancedParams, [field]: value },
      })),
    handleAdvancedSearch: () => handleSearch(state.advancedParams),
    loadMore,
  };
}
