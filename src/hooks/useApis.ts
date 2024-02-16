import {
  API,
  apis,
  getAPIOverrides,
  IAPIOverrides,
  setAPIOverride,
} from "@scottbenton/apps-config";
import { useCallback, useEffect, useState } from "react";

export function useApis() {
  const [apiOverrides, setApiOverrides] = useState<IAPIOverrides>({});

  useEffect(() => {
    setApiOverrides(getAPIOverrides());
  }, []);

  const handleSetApi = useCallback((key: API, url: string | undefined) => {
    setAPIOverride(key, url);
    location.reload();
  }, []);

  return { apis, apiOverrides, setApiOverride: handleSetApi };
}
