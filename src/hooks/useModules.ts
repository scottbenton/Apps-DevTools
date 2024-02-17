import {
  ModuleScope,
  modules,
  getModuleOverrides,
  IModuleOverrides,
  setModuleOverride,
} from "@scottbenton/apps-config";
import { useCallback, useEffect, useState } from "react";

export function useModules() {
  const [moduleOverrides, setModuleOverrides] = useState<IModuleOverrides>({});

  useEffect(() => {
    setModuleOverrides(getModuleOverrides());
  }, []);

  const handleSetModuleOverride = useCallback(
    (scope: ModuleScope, url: string | undefined) => {
      setModuleOverride(scope, url);
      location.reload();
    },
    []
  );

  return {
    modules,
    moduleOverrides,
    setModuleOverride: handleSetModuleOverride,
  };
}
