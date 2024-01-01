//для добавления devServer -> нужно импортировать type
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    //npm run start -- --env port=5000
    port: options.port ?? 5001,
    open: true,
    //для роутинга... Это работает только для dev-server, если раздавать статику через nginx, то надо делать проксирование на Index.html
    historyApiFallback: true,

    //npm i @pmmmwh/react-refresh-webpack-plugin@0.5.11
    //npm i react-refresh-typescript@2.0.9
    hot: true,
  };
}
