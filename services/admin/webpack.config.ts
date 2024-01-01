import path from 'path';
import webpack from 'webpack';
import {
  buildWebpack,
  BuildMode,
  BuildOptions,
  BuildPath,
  BuildPlatform,
} from '@packages/build-config';
import packageJson from './package.json';

export interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  platform?: BuildPlatform;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPath = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    //нужно для описания красивого пути
    src: path.resolve(__dirname, 'src'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    paths,
    //npm run build:prod -- --env analyzer=true
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx',
      },
      shared: {
        //@ts-ignore
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    })
  );

  return config;
};
