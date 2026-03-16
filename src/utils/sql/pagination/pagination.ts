import * as models from "../../../models/models.js";

const buildSQLLimit = (pagination: models.types.common.Pagination): string => {
  const { page, page_size } = pagination;
  const offset = (page - 1) * page_size;
  return `LIMIT ${page_size} OFFSET ${offset}`;
};

const buildPaginatedResponse = <T>(
  data: T[],
  total: number,
  pagination: models.types.common.Pagination,
): models.types.util.PaginatedData<T> => {
  const total_pages = Math.ceil(total / pagination.page_size);
  return {
    data,
    pagination: {
      page: pagination.page,
      items_count: data.length,
      page_size: pagination.page_size,
      total_pages,
      has_next: pagination.page < total_pages,
      has_prev: pagination.page > 1,
      total_count: total,
    },
  };
};

export { buildSQLLimit, buildPaginatedResponse };
