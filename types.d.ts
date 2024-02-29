/* eslint-disable no-use-before-define */
import type { ReactNode } from 'react'
import videojs from 'video.js'

declare module 'byteark-player-react' {
  import * as React from 'react'

  // eslint-disable-next-line no-unused-vars
  class ByteArkPlayerContainer extends React.Component<ByteArkPlayer> {
  }

  export = ByteArkPlayerContainer
}

export interface ByteArkPlayer extends videojs.Player {
  autoplayResult_: Readonly<{
    autoplay: boolean;
    muted: boolean;
  }>;
  canAutoplay(props: ByteArkPlayerOptions): Promise<boolean>;
  init: DefaultCreatePlayerFunction;
  initAsync: DefaultCreatePlayerFunction;
  isBrowserSupportDrm(): Promise<{ widevine: boolean; fairplay: boolean; }>;
  playbackRate(value: number): void;
  seekButtons?: boolean;
  setup: DefaultSetupPlayerFunction;
  sources: Array<ByteArkPlayerSource & Record<string, any>>;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window { bytearkPlayer: ByteArkPlayer; }
}

window.bytearkPlayer = window.bytearkPlayer || {}

type ByteArkPlayerPluginName = 'ads' | 'bytearkAds' | 'bytearkFirework' | 'bytearkHls' |
  'bytearkLighthouse' | 'contextmenuUI' | 'seekButtons' | 'bytearkVolumeBooster' | 'bytearkRetentionChart'

/**
 * An Object containing a structure like: `{src: 'url', type: 'mimetype'}` or string
 * that just contains the src url alone.
 * `var SourceObject = {src: 'http://ex.com/video.mp4', type: 'video/mp4'};`
 * `var SourceString = 'http://example.com/some-video.mp4';`
 */
export interface ByteArkPlayerSource {
  /** The url to the source */
  src: string;
  /** The MIME type of the source */
  type?: string | undefined;
  /** The video title text */
  title?: string;
  /** The video ID for ByteArk Lighthouse implementation */
  videoId?: string;
  /** The url of an image to be displayed before the video starts */
  poster?: string;
}

export interface ByteArkPlayerOptions extends videojs.PlayerOptions {
  autoplayadsmuted?: boolean;
  className?: string;
  createPlaceholderFunction?: DefaultCreatePlaceholderFunction;
  createPlayerFunction?: DefaultCreatePlayerFunction;
  lazyload?: boolean;
  onPlayerCreated?: (player: ByteArkPlayer) => any;
  onPlayerLoaded?: () => any;
  onPlayerLoadError?: (error: LoadErrorMessageProps, originalError: any) => any;
  onReady?: (player: ByteArkPlayer) => any;
  onPlayerSetup?: () => any;
  onPlayerSetupError?: (error: LoadErrorMessageProps, originalError: any) => any;
  playerEndpoint?: string;
  playerServerEndpoint?: string;
  playerSlugId?: string;
  playerVersion?: string;
  playerJsFileName?: string;
  playerCssFileName?: string;
  plugins?: Record<ByteArkPlayerPluginName | string, any>[];
  seekButtons?: boolean;
  sources: Array<ByteArkPlayerSource & Record<string, any>>;
  setupPlayerFunction?: DefaultSetupPlayerFunction;
  techCanOverridePoster?: boolean;
}

export type ByteArkPlayerWithAutoplayResult = ByteArkPlayerOptions & { autoplayResult_: Readonly<boolean> };

export interface LoadErrorMessageProps {
  message?: string;
  messageSecondary?: string;
  code?: string;
}

export interface PlayerPlaceholderProps {
  aspectRatio: string | undefined;
  onClick: () => void;
  className?: string;
  error: LoadErrorMessageProps | null;
  loaded: boolean;
  playerOptions: ByteArkPlayerOptions;
}

export type DefaultCreatePlaceholderFunction = (
  props: ByteArkPlayerOptions,
  state: {
    error: LoadErrorMessageProps | null;
    loaded: boolean;
  },
  onClickPlaceholder: () => void
) => ReactNode

export type DefaultCreatePlayerFunction = (
  videoNode: HTMLVideoElement | HTMLAudioElement,
  options: ByteArkPlayerOptions | ByteArkPlayerWithAutoplayResult,
  onReady: () => any
) => Promise<ByteArkPlayer>

export type DefaultSetupPlayerFunction = (
  /* Player's options */
  options: ByteArkPlayerOptions,
  /* Script/style loader function */
  loadScriptOrStyleFunction: (id: string, url: string, type: string) => any,
  /* options for load plugin from custom url */
  customOptions?: Record<string, string | Record<string, any>>
) => Promise<void>
