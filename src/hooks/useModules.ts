import { useEffect, useState } from "react";

export interface IModule {
  name: string;
  description: string;
  scope: string;
  defaultUrl: string;
}

export interface IModuleOverrides {
  [moduleKey: string]: string;
}

export function useModules() {
  const [modules, setModules] = useState<Record<string, IModule>>({});
  const [moduleOverrides, setModuleOverrides] = useState<IModuleOverrides>({});

  useEffect(() => {
    try {
      const parsedModules = JSON.parse(localStorage.getItem("modules") ?? "[]");
      const moduleMap: Record<string, IModule> = {};
      (parsedModules as IModule[]).map((module) => {
        moduleMap[module.scope] = module;
      });
      setModules(moduleMap);
    } catch {
      console.error("Error loading modules from local storage.");
    }
    try {
      const parsedModuleOverrides = JSON.parse(
        localStorage.getItem("module-overrides") ?? "{}"
      );
      setModuleOverrides(parsedModuleOverrides);
    } catch {
      console.error("Error loading module overrides from local storage.");
    }
  }, []);

  return { modules, moduleOverrides };
}
