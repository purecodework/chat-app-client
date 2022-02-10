import { useState, useCallback } from "react";
/**
 *  return isLoading, sendRequest()
 *  sendRequest takes url, method, body, and headers, return json response
 */
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.msg);
        }

        setIsLoading(false);
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return { isLoading, sendRequest };
};

export default useFetch;
