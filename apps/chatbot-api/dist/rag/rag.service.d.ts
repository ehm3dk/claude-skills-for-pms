import type { RagRetrieveResult } from './rag.types';
export declare class RagService {
    private corpus;
    retrieve(query: string): Promise<RagRetrieveResult>;
    private ensureCorpusLoaded;
    private countOccurrences;
}
