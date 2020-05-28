import React from "react";

export default (request) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const requestWithLoading = React.useCallback(
    async (...params) => {
      try {
        setIsLoading(true);
        const response = await request(...params);
        setIsLoading(false);
        return response;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [request]
  );

  return {
    isLoading,
    request: requestWithLoading,
  };
};
