import * as errors from "../../errors/errors.js";

import * as models from "../../models/models.js";

const POSTMAN_API_BASE_URL = "https://api.getpostman.com";

export const listCollections = async (
  listCollectionsReq: models.types.postman.ListCollectionsReq,
): Promise<models.types.postman.ListCollectionsRes> => {
  const apiKey = process.env.POSTMAN_API_KEY;

  if (!apiKey) {
    throw new errors.Configuration(
      "POSTMAN_API_KEY is not configured. Please add your Postman API key to the .env file.",
    );
  }

  try {
    const response = await fetch(`${POSTMAN_API_BASE_URL}/collections?workspace=${listCollectionsReq.workspace_id}`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new errors.HttpRequest(`Failed to fetch collections from Postman API: ${response.statusText}`);
    }

    const data = await response.json();
    const validatedData = models.schemas.postman.listCollectionsRes.parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof errors.Configuration || error instanceof errors.HttpRequest) {
      throw error;
    }
    throw new errors.Service(`Error listing Postman collections: ${error}`);
  }
};
