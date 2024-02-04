import { PropsWithChildren } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { IModuleContext, ModuleProvider } from './ModuleProvider';

export function AppProviders(
  props: PropsWithChildren<{ moduleContext: IModuleContext }>,
) {
  const { children, moduleContext } = props;

  return (
    <ThemeProvider>
      <ModuleProvider {...moduleContext}>{children}</ModuleProvider>
    </ThemeProvider>
  );
}
