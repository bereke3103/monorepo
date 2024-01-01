import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolver } from './buildResolver';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths, port } = options;

  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',

    //!Можно указывать несколько файлов, но всегда как обычно точкой входа является одна папка
    //   entry: {
    //     helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //     helloWorldSeconfFile: path.resolve(__dirname, 'src', 'index.js'),
    //   },

    entry: paths.entry,

    output: {
      path: paths.output,
      filename: '[name].[contenthash].bundle.js',
      chunkFilename: '[name].chunk-bundle-bereke.[contenthash].js',
      clean: true,
    },

    //сюда входят плагины
    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolver(options),
    //нужно для того, чтоб когда ошибка вылетела условно, в консоли мы могли комфортно смотреть на код -> для полного ознакомления можно перейти на webpack dev-tool source map
    devtool: isDev && 'inline-source-map',
    //и запускается через webpack server
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
