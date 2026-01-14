import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

const postman_configuration_id = commonSchema.id.describe(
  "The unique numeric identifier of the Postman configuration. The service will retrieve the API key and collection ID from the database and fetch the collection details from Postman API.",
);

export const getCollectionReqSchema = z
  .object({
    postman_configuration_id,
  })
  .describe(
    "Retrieves complete details of a specific Postman collection including all requests, folders, and configuration. Uses the stored Postman configuration (API key and collection ID) from the database.",
  );
