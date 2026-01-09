export const getToolsList = () => {
  return {
    tools: [
      {
        name: "hello_world",
        description: "Returns a hello world message",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Your name (optional)",
            },
          },
        },
      },
    ],
  };
};
