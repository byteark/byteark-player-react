import type { ICreatePlayerFunction, ISetupPlayerFunction } from '../types';

export const defaultCreatePlayerFunction: ICreatePlayerFunction = (node, options, onReady) => {
  if (window.bytearkPlayer.initAsync) {
    return window.bytearkPlayer.initAsync(node, options, onReady);
  }

  return window.bytearkPlayer.init(node, options, onReady);
};

export const defaultSetupPlayerFunction: ISetupPlayerFunction = async (options, loaderFunction, loadPluginOptions) => {
  await window.bytearkPlayer.setup(options, loaderFunction, loadPluginOptions);
};
