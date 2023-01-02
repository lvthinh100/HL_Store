import { useState } from "react";

export default function useAJAX(asyncTask) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsync = async (...data) => {
    try {
      setLoading(true);
      let result;
      if (data) {
        result = await asyncTask(...data);
      } else result = await asyncTask();
      setLoading(false);
      setError(null);
      return result;
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
      throw err;
    }
  };
  return [error, loading, handleAsync];
}
