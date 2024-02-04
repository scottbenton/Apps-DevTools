import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  dev: {
    port: 8081,
  },
  tools: {
    devServer: {
      client: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
  runtime: {
    router: true,
    state: true,
  },
  deploy: {
    microFrontend: true,
  },
  plugins: [appTools(), garfishPlugin()],
});
