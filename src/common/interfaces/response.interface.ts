export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
