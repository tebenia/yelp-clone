require('babel-register');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path'),
      join = path.join,
      resolve = path.resolve;
const getConfig = require('hjs-webpack');

const root = resolve(__dirname);
const src = resolve("src");
const modules =  resolve("node_modules");
const dist = resolve("dist");

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";
const isTest = NODE_ENV === "test";

var config = getConfig({
  isDev: isDev,
  in: join(src, "app.js"),
  out: dist,
  clearBeforeBuild: true
});

config.postcss = [].concat([
  require("precss")({}),
  require("autoprefixer")({}),
  require("cssnano")({})
]);

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l &&
      l.loader && l.loader.match(match));
  return found ? found[0] : null;
}
// existing css loader
const cssloader =
  findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  loader: cssloader.loader
    .replace(matchCssLoaders,
    `$1$2?modules&localIdentName=${cssModulesNames}$3`)
})
config.module.loaders.push(newloader);
cssloader.test =
  new RegExp(`[^module]${cssloader.test.source}`)
cssloader.loader = newloader.loader
// ...
config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css'
});

const dotenv = require('dotenv');
const dotEnvVar = dotenv.config();

const environmentEnv = dotenv.config({
  path: join(root, "config", `${NODE_ENV}.config.js`),
  silent: true,
});

const envVariables = Object.assign({}, dotEnvVar, environmentEnv);

const defines = Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV)
});

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);

config.resolve.root = [src, modules];
config.resolve.alias = {
  'css': join(src, 'styles'),
  'containers': join(src, 'containers'),
  'components': join(src, 'components'),
  'utils': join(src, 'utils')
};

if (isTest) {
  config.externals = {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }

  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/)

    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin'
    ].indexOf(fnName[1]);
    return idx < 0;
  })
}

module.exports = config;
