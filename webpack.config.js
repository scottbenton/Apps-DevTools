const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const PORT = 3001;
const name = "dev_tools";
const exposedFiles = {
  "./DevTools": "./src/DevTools.tsx",
};

module.exports = (_, argv) => [
  {
    output: {
      publicPath: "auto",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: PORT,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: name,
        filename: "remoteEntry.js",
        remotes: {},
        exposes: exposedFiles,
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      ...(argv.mode === "development"
        ? [
            new MFLiveReloadPlugin({
              port: PORT, // the port your app runs on
              container: "scottbenton_micro_frontend_host", // the name of your app, must be unique
              standalone: true, // false uses chrome extention
            }),
          ]
        : []),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv(),
    ],
  },
  {
    name: "dts",
    entry: Object.values(exposedFiles),
    mode: "development",
    output: {
      publicPath: "auto",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.tsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "dts-loader",
              options: {
                name: name,
                exposes: exposedFiles,
              },
            },
          ],
        },
      ],
    },
  },
];
