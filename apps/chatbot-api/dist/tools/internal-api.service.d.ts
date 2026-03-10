import type { InternalApiSearchResponse } from './internal-api.types';
export declare class InternalApiService {
    private readonly baseUrl;
    search(params: {
        query: string;
        limit: number;
        requestId?: string;
    }): Promise<InternalApiSearchResponse>;
}
