export interface InternalApiSearchResult {
  id: string;
  title: string;
  url?: string;
  snippet?: string;
}

export interface InternalApiSearchResponse {
  results: InternalApiSearchResult[];
}

