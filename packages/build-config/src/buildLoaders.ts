import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import ReactRefreshTypescript from 'react-refresh-typescript';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import { BuildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  //при сборке на дев легко дебажить
  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const assetsLoader = {
    // test: /\.(png|svg|jpg|jpeg|gif)$/i,
    //удаляем SVG так как мы его обрабатываем уже по другому отдельным loader
    //npm i @svgr/webpack@8.1.0
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        //тут настройки для Svg использования его как компонент
        options: {
          icon: true,
          svgConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader =
    // loader для стилизации
    //npm i -D css-loader@6.8.1
    //npm i -D style-loader@3.3.3
    //npm i -D sass-loader@13.3.2
    {
      // test: /\.css$/i,
      test: /\.(css|s[ac]ss)$/i, //<---объядинли css и scss
      use: [
        // 'style-loader', если есть MiniCssExtractPlugin -> то style-loader можно не вставлять
        //
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        cssLoaderWithModules,
        // 'css-loader',
        'sass-loader',
      ],
    };

  //!1 первый вариант
  // const tsLoader = {
  //   //ts-loader умеет работать с JSX
  //   //Если бы не использовали тайпскрипт: нужен был бы babel-loader
  //   // test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // };

  //!2 второй вариант
  const tsLoader = {
    //ts-loader умеет работать с JSX
    //Если бы не использовали тайпскрипт: нужен был бы babel-loader
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          //пропускат ошибки TypeScript, но с помощью плагина new ForkTsCheckerWebpackPlugin() при компиляции ругнется на тайпскриптовую ошибку, так как из за флажка transpileOnly - может пропустить
          //для проверки во время компиляции
          // "typecheck": "tsc"
          transpileOnly: true,
          // getCustomTransformers: () => {
          //   //после того, добавили его в лоадер, нужно добавить плагин // plugins.push(new ReactRefreshPlugin());
          //   before: [isDev && ReactRefreshTypescript()].filter(Boolean);
          // },
        },
      },
    ],
  };

  const babelLoader = BuildBabelLoader(options);

  return [
    assetsLoader,
    scssLoader,
    tsLoader,
    //так как у нас имеется конфигурация babelLoader, ts-loader можем типа не использовать
    // babelLoader,
    svgLoader,
  ];
}
