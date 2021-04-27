/* global process, __dirname */

const path = require(`path`);
const HTMLWebpackPlugin = require(`html-webpack-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const OptimizeCssAssetWebpackPlugin = require(`optimize-css-assets-webpack-plugin`);
const TerserWebpackPlugin = require(`terser-webpack-plugin`);
const globImporter = require(`node-sass-glob-importer`);

const isDev = process.env.NODE_ENV === `development`;
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: `all`
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
};

const filename = (ext) => isDev ? `[name].${ext}` : `[hash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    `css-loader`
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};


const plugins = () => {
  return [
    new HTMLWebpackPlugin({
      template: `./index.html`,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `src/favicon.ico`),
          to: path.resolve(__dirname, `dist`)
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename(`css`)
    })
  ];
};

module.exports = {
  context: path.resolve(__dirname, `src`),
  mode: "development",
  entry: [`@babel/polyfill`, path.join(__dirname, `src/index.tsx`)],
  output: {
    filename: filename(`js`),
    path: path.resolve(__dirname, `dist`)
  },
  resolve: {
    extensions: [
      `.js`,
      `.jsx`,
      `.ts`,
      `.tsx`,
    ],
    alias: {
      "#components": path.resolve(__dirname, `src`, `components`),
      "#src": path.resolve(__dirname, `src`),
      "#client": path.resolve(__dirname),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3002,
    hot: isDev,
    publicPath: `/`,
    historyApiFallback: true,
  },
  devtool: isDev ? "source-map" : undefined,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders(`less-loader`)
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders({
          loader: `sass-loader`,
          options: {
            sassOptions: {
              importer: globImporter()
            }
          }
        })
      },
      {
        test: /\.(mp3)$/,
        use: [`file-loader`]
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: `file-loader`,
          options: {
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, "src/"),
            outputPath: 'dist/',
            publicPath: '../',
            useRelativePaths: true
          }
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }
    ]
  }
};
