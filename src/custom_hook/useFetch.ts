import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("שגיאה בטעינת הנתונים");
        return response.json();
      })
      .then((data) => {
        if (isMounted) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (isMounted) setState({ data: null, loading: false, error: error.message });
      });

    return () => {
      isMounted = false; 
    };
  }, [url]);

  return state; 
}
