import { constructModuleWebpackConfig } from "@scottbenton/apps-build";
import { ModuleScope } from "@scottbenton/apps-config";

const config = constructModuleWebpackConfig(
  {
    name: ModuleScope.DeveloperTools,
    dependencies: {},
    exposes: {
      "./DevTools": "./src/DevTools.tsx",
    },
  },
  true
);

export default config;
