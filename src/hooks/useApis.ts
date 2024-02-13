import { useCallback, useEffect, useState } from "react";

export interface IApi {
  name: string;
  description: string;
  key: string;
  defaultUrl: string;
}

export interface IApiOverrides {
  [apiKey: string]: string;
}

export function useApis() {
  const [apis, setApis] = useState<Record<string, IApi>>({});
  const [apiOverrides, setApiOverrides] = useState<IApiOverrides>({});

  useEffect(() => {
    try {
      const parsedApis = JSON.parse(
        localStorage.getItem("default-apis") ?? "[]"
      );
      const apiMap: Record<string, IApi> = {};
      (parsedApis as IApi[]).map((api) => {
        apiMap[api.key] = api;
      });
      setApis(apiMap);
    } catch {
      console.error("Error loading apis from local storage.");
    }
    try {
      const parsedApiOverrides = JSON.parse(
        localStorage.getItem("api-overrides") ?? "{}"
      );
      setApiOverrides(parsedApiOverrides);
    } catch {
      console.error("Error loading api overrides from local storage.");
    }
  }, []);

  const setApiOverride = useCallback(
    (key: string, url: string | undefined) => {
      let newOverrides = { ...apiOverrides };
      if (url) {
        newOverrides[key] = url;
      } else {
        delete newOverrides[key];
      }
      localStorage.setItem("api-overrides", JSON.stringify(newOverrides));
      location.reload();
    },
    [apiOverrides]
  );

  return { apis, apiOverrides, setApiOverride };
}
