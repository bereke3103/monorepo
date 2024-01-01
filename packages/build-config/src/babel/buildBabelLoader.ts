import { BuildOptions } from '../types/types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function BuildBabelLoader(options: BuildOptions) {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins = [];

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testId'],
      },
    ]);
  }
  return {
    // test: /\.m?js$/,
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          //npm i -D @babel/preset-typescript@7.23.2 для начала устанавливаем пресет typescript, и вставляем в массив
          '@babel/preset-typescript',
          //npm i -D @babel/preset-react@7.22.15 для начала устанавливаем пресет реакт, и вставляем в массив
          //возможно тут может возникнуть ошибка, по этому вставляем пресет реакт в отдельный масссив и добавляем доп опцци
          [
            '@babel/preset-react',
            {
              runtime: isDev ? 'automatic' : 'classic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}
