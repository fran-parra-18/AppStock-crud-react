import { UseApiCall } from "../models/useApi.model";
import { useCallback, useEffect, useState } from "react";

type UseApiOptions<P> = {
  autoFetch?: boolean;
  params: P
}

type Data<T> = T | null;
type CustomError = Error | null;

interface UseApiResult<T, P> {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => { promise: Promise<T>; controller: AbortController };
}



export const useApi = <T, P,>(apiCall: (param: P) => UseApiCall<T>, options?: UseApiOptions<P>): UseApiResult<T, P> => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Data<T>>(null)
  const [error, setError] = useState<CustomError>(null)

  const fetch = useCallback((param: P) => {
  const { call, controller } = apiCall(param);
  setLoading(true);

  const promise = call
    .then((response) => {
      setData(response.data);
      setError(null);
      return response.data;
    })
    .catch((err) => {
      setError(err);
      throw err;
    })
    .finally(() => setLoading(false));

  return { promise, controller };
}, [apiCall]);

  useEffect(() => {
    if (options?.autoFetch) {
      fetch(options.params);
    }

  }, [fetch, options?.autoFetch, options?.params])

  return { loading, data, error, fetch }
}
