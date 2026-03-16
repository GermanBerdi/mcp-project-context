export type PaginatedData<T> = {
  data: T[];
  pagination: {
    page: number;
    items_count: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
    total_count: number;
  };
};
