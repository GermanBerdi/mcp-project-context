import * as errors from "../../errors/errors.js";

import * as models from "../../models/models.js";

const POSTMAN_API_BASE_URL = "https://api.getpostman.com";

export const createCollection = async (
  createCollectionReq: models.types.postman.CreateCollectionReq,
): Promise<models.types.postman.CreatedCollection> => {
  const apiKey = process.env.POSTMAN_API_KEY;

  if (!apiKey) {
    throw new errors.Configuration("POSTMAN_API_KEY not found in environment variables");
  }

  const body = {
    collection: {
      info: {
        name: createCollectionReq.name,
        description: createCollectionReq.description || "",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      },
      item: [],
    },
  };

  try {
    const response = await fetch(`${POSTMAN_API_BASE_URL}/collections?workspace=${createCollectionReq.workspace_id}`, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new errors.HttpRequest(`Failed to create collection in Postman API: ${response.statusText}`);
    }

    const data = await response.json();
    const validated = models.schemas.postman.createCollectionRes.parse(data);

    return validated.collection;
  } catch (error) {
    if (error instanceof errors.Configuration || error instanceof errors.HttpRequest) {
      throw error;
    }
    throw new errors.Service(`Error creating Postman collection: ${error}`);
  }
};
