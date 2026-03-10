export interface RagSnippet {
  sourceId: string;
  title: string;
  snippet: string;
}

export interface RagRetrieveResult {
  snippets: RagSnippet[];
}

