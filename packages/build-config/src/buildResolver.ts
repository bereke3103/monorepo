import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolver(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    //нужно для описания красивого пути
    alias: {
      '@': options.paths.src,
    },
  };
}
