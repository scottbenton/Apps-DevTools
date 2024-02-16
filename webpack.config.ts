import { constructModuleWebpackConfig } from "@scottbenton/apps-build";
import { ModuleScope } from "@scottbenton/apps-config";
import { dependencies } from "./package.json";

const config = constructModuleWebpackConfig({
  name: ModuleScope.DeveloperTools,
  dependencies,
  exposes: {
    "./DevTools": "./src/DevTools.tsx",
  },
});

export default config;
