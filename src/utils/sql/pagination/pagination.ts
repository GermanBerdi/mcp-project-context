import * as models from "../../../models/models.js";

const buildSQLLimit = (pagination: models.types.common.Pagination): string => {
  const { page, pageSize } = pagination;
  const offset = (page - 1) * pageSize;
  return `LIMIT ${pageSize} OFFSET ${offset}`;
};

const buildPaginatedResponse = <T>(
  data: T[],
  total: number,
  pagination: models.types.common.Pagination,
): models.types.util.PaginatedData<T> => {
  const totalPages = Math.ceil(total / pagination.pageSize);
  return {
    data,
    pagination: {
      page: pagination.page,
      itemsCount: data.length,
      pageSize: pagination.pageSize,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
      totalCount: total,
    },
  };
};

export { buildSQLLimit, buildPaginatedResponse };
