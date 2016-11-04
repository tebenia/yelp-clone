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

var config = getConfig({
  isDev: isDev,
  in: join(src, "app.js"),
  out: dist,
  clearBeforeBuild: true
});

module.exports = config;
