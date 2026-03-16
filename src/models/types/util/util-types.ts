export type PaginatedData<T> = {
  data: T[];
  pagination: {
    page: number;
    itemsCount: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalCount: number;
  };
};
