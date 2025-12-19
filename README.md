# ByteArk Player Container for React

[![NPM](https://img.shields.io/npm/v/byteark-player-react.svg)](https://www.npmjs.com/package/byteark-player-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [ByteArk Player Container for React](#byteark-player-container-for-react)
  - [Demo](#demo)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Basic Props](#basic-props)
    - [Source Object](#source-object)
  - [Callback Props](#callback-props)
  - [Advanced Props](#advanced-props)
  - [Advanced Usages](#advanced-usages)
    - [Controlling Players](#controlling-players)
    - [Using VideoJS Plugins](#using-videojs-plugins)
    - [Request Media/Encryption with credentials](#request-mediaencryption-with-credentials)
    - [Use with Next.js](#use-with-nextjs)
  - [License](#license)

## Demo

You can try on [the demo page](https://byteark.github.io/byteark-player-react).

## Features

* Remote player updates. No need to update your code for minor improvements.
* Using placeholder to maintain page's layout before the player ready.
* Controls basic behaviours via props.
* Custom advance behaviours via callbacks to access ByteArk Player/VideoJS instance directly.
* Supported TypeScript

## Installation

This library is distributed via NPM. You may install from NPM or Yarn.

```bash
# For NPM
npm install --save byteark-player-react
# For Yarn
yarn add byteark-player-react
# For pnpm
pnpm add byteark-player-react
```

## Usage

Include `ByteArkPlayerContainer` component into your component.

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import type { ByteArkPlayerContainerProps } from 'byteark-player-react'

const App = () => {
  const playerOptions: ByteArkPlayerContainerProps = {
    autoplay: 'any',
    fluid: true,
    aspectRatio: '16:9',
    poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/H/7H6hEZrLH.png',
    sources: [
      {
        src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: 'Big Buck Bunny',
        videoId: 'TZyZheqEJUwC',
        poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/H/7H6hEZrLH.png'
      }
    ]
  }
  return <ByteArkPlayerContainer {...playerOptions} />
}

render(<App />, document.getElementById('root'))
```

If the video will be displayed on the fixed-size container,
you may want to use fill mode instead.

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import type { ByteArkPlayerContainerProps } from 'byteark-player-react'

const App = () => {
  const playerOptions: ByteArkPlayerContainerProps = {
    autoplay: 'any',
    fill: true,
    poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/H/7H6hEZrLH.png',
    sources: [
      {
        src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: 'Big Buck Bunny',
        videoId: 'TZyZheqEJUwC',
        poster: 'https://stream-image.byteark.com/image/video-cover-480p/7/H/7H6hEZrLH.png'
      }
    ]
  }

  return <ByteArkPlayerContainer {...playerOptions} />
}

render(<App />, document.getElementById('root'))
```

## Basic Props
Following properties are the properties that can be updated to the player,
without re-creating the player instance. Additional properties will be passed to player.

| Name          | Type           | Default | Description                                                                   |
|---------------|----------------|---------|-------------------------------------------------------------------------------|
| autoplay      | Boolean/String | true    | Autoplay the video after player is created. (true/false/'muted'/'play'/'any') |
| aspectRatio   | String         | -       | Use with fluid layout mode, to inform expected video's aspect ratio (16:9)    |
| controls      | Boolean        | true    | Show/hide the controls bar.                                                   |
| fill          | Boolean        | -       | Use fill layout mode.                                                         |
| fluid         | Boolean        | -       | Use fluid layout mode.                                                        |
| loop          | Boolean        | -       | Restart the video playback after plays to the end.                            |
| muted         | Boolean        | -       | Play the video without sounds.                                                |
| playerSlugId  | String         | -       | SlugId of player created via api player server service                        |
| playerVersion | String         | 1.0     | Version of the player to use.                                                 |
| playbackRate  | Number         | 1.0     | Playback speed. 1.0 means original speed.                                     |
| playsinline   | Boolean        | true    | Should be true so custom controls available on all platforms, including iOS.  |
| poster        | String         | -       | Image to be show before the video is playing.                                 |
| preload       | String         | -       | Preload the video before play. ('none'/'metadata'/'auto')                     |
| responsive    | Boolean        | -       | Auto show/hide controls depending on the screen size.                         |
| seekButtons   | Boolean        | false   | Show 10 seconds seek buttons and allow double-tap to seek on mobile.          |
| sources       | Array          | -       | Array of video source object to be played.                                    |
| volume        | Number         | -       | Video's volume, between 0 to 1.                                               |

You can also use other props not listed here,
but appear as [VideoJS's options](https://docs.videojs.com/tutorial-options.html#playbackrates).
However, changing props will not effective after the player is created.

### Source Object

The `source` object has 2 required fields, and more optional field:

| Name    | Type   | Description                            |
|---------|--------|----------------------------------------|
| src     | String | URL to the video.                      |
| type    | String | Video content type.                    |
| title   | String | Video title to display on the player.  |
| videoId | String | Video's ID, usually used on Analytics. |
| poster  | String | Poster image URL for the video.        |

To provide multiple version of sources, you can use array of source objects.

## Callback Props

We also provide some callback properties, so you can inject some behaviours
directly to the ByteArk Player, and also, to the VideoJS's instance.

| Name                 | Type     | Callback Parameters                                                        | Description                                                                 |
|----------------------|----------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| onPlayerLoaded       | Function | -                                                                          | Callback function to be called when loaded player's resources.              |
| onPlayerLoadingError | Function | `({error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError)` | Callback function to be called when there're an error about loading player. |
| onPlayerSetup        | Function | -                                                                          | Callback function to be called when player is setup.                        |
| onPlayerSetupError   | Function | `({error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError)` | Callback function to be called when there're an error when setup player.    |
| onReady              | Function | `(player: ByteArkPlayer)`                                                  | Callback function to be called when a player instance is ready.             |
| onPlayerCreated      | Function | `(player: ByteArkPlayer)`                                                  | Callback function to be called when a player instance is created.           |

## Advanced Props

We also provide some ways to custom the appearance of the video placeholder,
and some advance behaviours.

| Name                      | Type     | Description                                                                     |
|---------------------------|----------|---------------------------------------------------------------------------------|
| createPlaceholderFunction | Function | Custom video placeholder. This function should return a React component.        |
| createPlayerFunction      | Function | Custom video instance. This function should return a VideoJS's player instance. |
| lazyload                  | Boolean  | The player loads its asset files once it got rendered on the webpage. By passing this prop, the player then loads its asset files once the user clicked on the player instead. |
| playerEndpoint            | String   | Endpoint to the video player (without version part).                            |
| playerJsFileName          | String   | File name of player's JS.                                                       |
| playerCssFileName         | String   | File name of player's CSS.                                                      |

```jsx
import { ByteArkPlayerContainer } from 'byteark-player-react'

const App = () => {
  // An Advanced Props Example
  return
    <ByteArkPlayerContainer
      {...playerOptions}
      playerEndpoint='my-custom-endpoint'
      lazyload />
}
```

## Advanced Usages

### Controlling Players

You may access the player instance from `onReady` callback parameter.

```jsx
// This following example allows user to play/pause the video playback
// from custom buttons outside.

import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import type { ByteArkPlayerContainerProps, ByteArkPlayer } from 'byteark-player-react'

const App = () => {
  const playerOptions: ByteArkPlayerContainerProps = {
    autoplay: 'any',
    fluid: true,
    sources: [
      {
        src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: 'Big Buck Bunny',
        videoId: 'TZyZheqEJUwC'
      }
    ]
  }

  let playerInstance = null
  const onReady = (newPlayerInstance: ByteArkPlayer) => {
    playerInstance = newPlayerInstance
  }

  return <div>
    <ByteArkPlayerContainer {...playerOptions} onReady={onReady} />
    <button onClick={() => playerInstance?.play()}>Play</button>
    <button onClick={() => playerInstance?.pause()}>Pause</button>
  </div>
}

render(<App />, document.getElementById('root'))
```

### Using VideoJS Plugins

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import type { ByteArkPlayerContainerProps, ByteArkPlayer } from 'byteark-player-react'

const App = () => {
  const playerOptions: ByteArkPlayerContainerProps = {
    autoplay: 'any',
    fluid: true,
    sources: [
      {
        src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: 'Big Buck Bunny',
        videoId: 'TZyZheqEJUwC'
      }
    ]
  }

  const onReady = (newPlayerInstance: ByteArkPlayer) => {
    // The player is ready! Initialize plugins here.
    newPlayerInstance.somePlugin()
  }

  return <ByteArkPlayerContainer {...playerOptions} onReady={onReady} />
}

render(<App />, document.getElementById('root'))
```

### Request Media/Encryption with credentials

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import type { ByteArkPlayerContainerProps, ByteArkPlayer } from 'byteark-player-react'

const App = () => {
  const playerOptions: ByteArkPlayerContainerProps = {
    autoplay: 'any',
    fluid: true,
    sources: [
      {
        src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: 'Big Buck Bunny',
        videoId: 'TZyZheqEJUwC'
      }
    ],
    html5: {
      hlsjs: {
        xhrSetup: function(xhr: XMLHttpRequest, url: string) {
          xhr.withCredentials = true
        }
      }
    }
  }

  const onReady = (newPlayerInstance: ByteArkPlayer) => {
    // The player is ready! Initialize plugins here.
  }

  return <ByteArkPlayerContainer {...playerOptions} onReady={onReady} />
}
```

### Use with Next.js

ByteArk Player requires browser APIs, so it needs to be loaded as a client component with SSR disabled in Next.js App Router.

**Step 1.** Create a client component wrapper (`byteark-player.tsx`):

```tsx
'use client';

import { ByteArkPlayerContainer } from 'byteark-player-react';

export default ByteArkPlayerContainer;
```

**Step 2.** Use dynamic import in your page component:

```tsx
'use client';

import dynamic from 'next/dynamic';

import type { ByteArkPlayerContainerProps } from 'byteark-player-react';

const ByteArkPlayerContainer = dynamic(() => import('./byteark-player'), {
  ssr: false,
  loading: () => (
    <div className='flex aspect-video w-full items-center justify-center bg-black'>
      <span className='text-white'>Loading player...</span>
    </div>
  ),
});

export default function VideoPage() {
  const playerOptions: ByteArkPlayerContainerProps = {
    autoplay: 'any',
    fluid: true,
    sources: [
      {
        src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8',
        type: 'application/x-mpegURL',
        title: 'Big Buck Bunny',
        videoId: 'TZyZheqEJUwC',
      },
    ],
  };

  return <ByteArkPlayerContainer {...playerOptions} />;
}
```

## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
