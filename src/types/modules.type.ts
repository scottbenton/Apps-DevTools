export interface IModule {
  name: string;
  friendlyName: string;
  description: string;
  entry: string;
}

export interface IModuleOverrides {
  [moduleName: string]: string;
}
