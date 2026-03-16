# Pagination for `list_notes`

## Problem

Projects with many notes produce responses that are too large when calling `list_notes`. This overloads the LLM context window and makes it hard to navigate.

## Decision

Add pagination support to `list_notes` via optional `limit` and `offset` parameters. The response will include a `total` count so the caller knows how many pages exist.

## Pattern (from reference project)

```ts
const getAll = async (
  filters: models.types.campaigns.Filters,
  pagination: models.types.common.params.Pagination,
): Promise<models.types.util.pagination.PaginatedData<models.types.campaigns.Row>> => {
  const { total, data } = await repos.campaigns.getAll(filters, pagination);
  return utils.sql.pagination.buildPaginatedResponse(data, total, pagination);
};
```

### Key pieces identified

- `models.types.common.params.Pagination` — shared pagination params type (likely `limit` + `offset`)
- `models.types.util.pagination.PaginatedData<T>` — generic paginated response wrapper
- Repo returns `{ total, data }` — COUNT and rows in a single call
- `utils.sql.pagination.buildPaginatedResponse(data, total, pagination)` — builds the final response shape

### Full reference code

**`paginationParamsSchema`** — schema Zod con defaults:

```ts
const paginationParamsSchema = z
  .object({ page: z.number().int().min(1).default(1), pageSize: z.number().int().min(1).max(100).default(20) })
  .optional()
  .default({ page: 1, pageSize: 20 });
```

**`PaginatedData<T>`** — response shape:

```ts
type PaginatedData<T> = {
  data: T[];
  pagination: { page; itemsCount; pageSize; totalPages; hasNext; hasPrev; totalCount };
};
```

**`TotalAndData<T>`** — what the repo returns:

```ts
type TotalAndData<T> = { total: number; data: T[] };
```

**`buildSQLLimit`** — builds `LIMIT x OFFSET y` string from page/pageSize.

**`buildPaginatedResponse`** — computes totalPages, hasNext, hasPrev and wraps data.

**Repo pattern** — two queries: one `COUNT(*)` with the same WHERE, one `SELECT` with `LIMIT/OFFSET`.

## Implementation Plan

### 1. Schemas

- `src/models/schemas/common/params/pagination-params-schema.ts` — new file
- `src/models/schemas/common/params/` index — export it

### 2. Types

- `src/models/types/common/common-types.ts` — add `TotalAndData<T>` and `TotalRowDataPacket`
- `src/models/types/common/params/params-types.ts` — add `Pagination` type

### 3. Utils

- `src/utils/sql/pagination/pagination.ts` — `buildSQLLimit` + `buildPaginatedResponse`
- Wire into `utils` barrel

### 4. Repo (`notes-repo.ts`)

- `getByProjectId` receives optional `Pagination`, runs COUNT + SELECT, returns `TotalAndData<Row>`

### 5. Service (`notes-service.ts`)

- `listByProjectId` receives optional `Pagination`, calls repo, calls `buildPaginatedResponse`

### 6. Tool (`list-notes-tool.ts`)

- Add `paginationParamsSchema` to `inputSchema` (optional, with defaults)
