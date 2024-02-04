/* eslint-disable react/no-unused-prop-types */
import { Outlet } from '@modern-js/runtime/router';
import { IModule, IModuleOverrides } from '@/types/modules.type';
import { AppProviders } from '@/providers/AppProviders';

interface DevToolsProps {
  modules: IModule[];
  overrides: IModuleOverrides;
  setModuleOverride: (
    moduleName: string,
    entryPoint: string | undefined,
  ) => void;
}
export default function Layout(props: DevToolsProps) {
  return (
    <AppProviders moduleContext={props}>
      <Outlet />
    </AppProviders>
  );
}
