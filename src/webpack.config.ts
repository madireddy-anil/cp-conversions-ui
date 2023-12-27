import { ProvidePlugin, Configuration, container } from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import path from 'path'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import deps from './package.json'
// Get types for dev server
import 'webpack-dev-server'
const { ModuleFederationPlugin } = container
const dependencies = deps.dependencies
const stylesHandler = MiniCssExtractPlugin.loader

type Environment = 'dev' | 'prd' | 'tst'
const ENVIRONMENT = (process.env.ENVIRONMENT ?? 'dev') as Environment
enum ENVIRONMENT_TYPE {
  dev = '.tst',
  prd = '',
  tst = '.tst',
}

// const LOCAL_NEW_ACCOUNTS_MFE_URL = `newAccounts@http://localhost:3001/remoteEntry.js`;

const NEW_ACCOUNTS_MFE_URL = `newAccounts@https://accounts-ui${ENVIRONMENT_TYPE[ENVIRONMENT]}.getorbital.io/remoteEntry.js`
// const HOST_APP_STORE = `clientPortal@https://app${ENVIRONMENT_TYPE[ENVIRONMENT]}.getorbital.com/remoteEntry.js`;

const supportedExtensions = ['.js', '.jsx', '.ts', '.tsx']

const config: Configuration = {
  target: 'web',
  mode: ENVIRONMENT === 'prd' ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src', 'app', 'index'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[contenthash].js',
    chunkFilename: 'chunk-[name].[contenthash].js',
    // publicPath: path.resolve(__dirname, "public")
  },
  devServer: {
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    host: 'localhost',
    watchFiles: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.js', 'src/**/*.css', 'src/**/*.scss', 'src/**/*.sass'],
    hot: true,
    compress: true,
    liveReload: true,
    // prevent not found page on refresh
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'conversions',
      filename: 'remoteEntry.js',
      remotes: {
        // Add your new modules here:
        newAccounts: NEW_ACCOUNTS_MFE_URL,
      },
      exposes: {
        './listOfPrivateRoutesWrapped': './src/router/PrivateRoutes/listOfPrivateRoutesWrapped.tsx',
        './new-conversion': './src/pages/NewConversion/WrappedConversionComponent.tsx',
        './conversion-dashboard': './src/pages/Conversions/WrappedConversionsComponent.tsx',
      },
      shared: [
        {
          ...dependencies,
          react: { requiredVersion: dependencies.react, singleton: true },
          'react-dom': {
            requiredVersion: dependencies['react-dom'],
            singleton: true,
          },
          'react-router-dom': {
            requiredVersion: dependencies['react-router-dom'],
            singleton: true,
          },
          '@auth0/auth0-react': {
            singleton: true,
            strictVersion: true,
          },
          '@payconstruct/design-system': {
            singleton: true,
            strictVersion: true,
          },
          '@payconstruct/orbital-auth-provider': {
            singleton: true,
            strictVersion: false,
          },
          antd: {
            singleton: true,
            strictVersion: true,
            requiredVersion: '4.16.13',
          },
        },
        '.src/pages/Context/Provider',
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'app', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv({
      path: path.resolve('env', 'local.env'),
      safe: true,
      allowEmptyValues: true,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
    new ESLintPlugin({
      extensions: supportedExtensions,
    }),
    new ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: {
    // symlinks: false,
    extensions: supportedExtensions,
    plugins: [
      new TsconfigPathsPlugin({
        extensions: supportedExtensions,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                // mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName: '[name]--[hash:base64:5]',
                // localIdentContext: path.resolve(__dirname, "src"),
                // localIdentHashSalt: "my-custom-hash"
                exportLocalsConvention: 'camelCase',
                // exportOnlyLocals: false,
                // namedExport: true
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx|js|jsx)$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: '> 0.25%, not dead',
                  },
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
    sideEffects: true,
    innerGraph: true,
    splitChunks: {
      chunks: 'async',
      // chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        svgGroup: {
          test(module: any) {
            // `module.resource` contains the absolute path of the file on disk.
            // Note the usage of `path.sep` instead of / or \, for cross-platform compatibility.
            return (
              module.resource &&
              module.resource.endsWith('.svg') &&
              module.resource.includes(`${path.sep}cacheable_svgs${path.sep}`)
            )
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  externals: {
    React: 'react',
  },
}

module.exports = () => {
  if (ENVIRONMENT === 'prd') {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}
