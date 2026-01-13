import * as errors from "../../errors/errors.js";

import * as models from "../../models/models.js";

const POSTMAN_API_BASE_URL = "https://api.getpostman.com";

const listWorkspaces = async (): Promise<models.types.postman.ListWorkspacesRes> => {
  const apiKey = process.env.POSTMAN_API_KEY;

  if (!apiKey) {
    throw new errors.Configuration(
      "POSTMAN_API_KEY is not configured. Please add your Postman API key to the .env file.",
    );
  }

  try {
    const response = await fetch(`${POSTMAN_API_BASE_URL}/workspaces`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new errors.HttpRequest(`Failed to fetch workspaces from Postman API: ${response.statusText}`);
    }

    const data = await response.json();
    const validated = models.schemas.postman.ListWorkspacesResSchema.parse(data);

    return validated;
  } catch (error) {
    if (error instanceof errors.Configuration || error instanceof errors.HttpRequest) {
      throw error;
    }
    throw new errors.Service(`Error listing Postman workspaces: ${error}`);
  }
};

export const service = {
  listWorkspaces,
};
