# Postman - Escenario 1

- Setup completo desde cero
  **Opción 1 - Setup completo desde cero:**

1. Configura `POSTMAN_API_KEY` en tu archivo `.env`
2. Lista los workspaces disponibles usando `list_postman_workspaces`
3. Crea una nueva colección usando `create_postman_collection` (nombre, descripción, workspace_id)
4. Crea la configuración del proyecto usando `create_postman_configuration` (project_id, configuration_name, api_key, workspace_id, collection_id)
