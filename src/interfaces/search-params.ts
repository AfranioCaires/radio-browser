import { RadioStation } from "./radio-data";

export interface SearchParams {
  name: string;
  country: string;
  language: string;
}

export interface RadioSearchState {
  simpleSearch: string;
  advancedParams: SearchParams;
  loading: boolean;
  radios: RadioStation[];
  hasMore: boolean;
  offset: number;
}
