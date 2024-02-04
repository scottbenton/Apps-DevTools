import { PropsWithChildren, createContext, useContext } from 'react';
import { IModule, IModuleOverrides } from '@/types/modules.type';

export interface IModuleContext {
  modules: IModule[];
  overrides: IModuleOverrides;
  setModuleOverride: (moduleName: string, entry: string | undefined) => void;
}

const ModuleContext = createContext<IModuleContext>({
  modules: [],
  overrides: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModuleOverride: () => {},
});

export function useModules() {
  return useContext(ModuleContext);
}

export function ModuleProvider(props: PropsWithChildren<IModuleContext>) {
  const { children, ...moduleContext } = props;
  return (
    <ModuleContext.Provider value={moduleContext}>
      {children}
    </ModuleContext.Provider>
  );
}
