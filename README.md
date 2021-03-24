# ByteArk Player Container for React

[![NPM](https://img.shields.io/npm/v/byteark-player-react.svg)](https://www.npmjs.com/package/byteark-player-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

* [Demo](#demo)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Basic Props](#basic-props)
    * [Source Object](#source-object)
* [Callback Props](#callback-props)
* [Advanced Props](#advanced-props)
* [API Methods](#api-methods)
* [Advanced Usages](#advanced-usages)
    * [Controlling Players](#controlling-players)
    * [Request Media/Encryption with credentials](#request-mediaencryption-with-credentials)

## Demo

You can try on [the demo page](https://byteark.github.io/byteark-player-react).

## Features

* Remote player updates. No need to update your code for minor improvements.
* Using placeholder to maintain page's layout before the player ready.
* Controls basic behaviours via props.
* Custom advance behaviours via callbacks to access ByteArk Player/VideoJS instance directly.

## Installation

This library is distributed via NPM. You may install from NPM or Yarn.

```bash
# For NPM
npm install --save byteark-player-react
# For Yarn
yarn add byteark-player-react
```

## Usage

Include `ByteArkPlayerContainer` component into your component.

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'

const App = () => {
  const playerOptions = {
    autoplay: true,
    fluid: true,
    aspectRatio: '16:9',
    poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg'
    sources: {
      src: 'https://video.example.com/path/to/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      // Optional
      title: 'Video Title',
      videoId: 'RI2PimuHxDXw',
      poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg'
    }
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

const App = () => {
  const playerOptions = {
    autoplay: true,
    fill: true,
    poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg'
    sources: {
      src: 'https://video.example.com/path/to/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      // Optional
      title: 'Video Title',
      videoId: 'RI2PimuHxDXw',
      poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg'
    }
  }
  return <ByteArkPlayerContainer {...playerOptions} />
}

render(<App />, document.getElementById('root'))
```

## Basic Props

Following properties are the properties that can be updated to the player,
without re-creating the player instance. Additional properties will be passed to player.

| Name                 | Type           | Default | Description                                                                  |
|----------------------|----------------|---------|------------------------------------------------------------------------------|
| autoplay             | Boolean        | true    | Autoplay the video after player is created.                                  |
| aspectRatio          | String         | -       | Use with fluid layout mode, to inform expected video's aspect ratio (16:9)   |
| controls             | Boolean        | true    | Show/hide the controls bar.                                                  |
| fill                 | Boolean        | -       | Use fill layout mode.                                                        |
| fluid                | Boolean        | -       | Use fluid layout mode.                                                       |
| loop                 | Boolean        | -       | Restart the video playback after plays to the end.                           |
| muted                | Boolean        | -       | Play the video without sounds.                                               |
| playerVersion        | String         | 1.0     | Version of the player to use.                                                |
| playbackRate         | Number         | 1.0     | Playback speed. 1.0 means original speed.                                    |
| playsinline          | Boolean        | true    | Should be true so custom controls available on all platforms, including iOS. |
| poster               | String         | -       | Image to be show before the video is playing.                                |
| preload              | String         | -       | Preload the video before play. (none|metadata|auto)                          |
| responsive           | Boolean        | -       | Auto show/hide controls depending on the screen size.                        |
| seekButtons          | Boolean        | false   | Show 10 seconds seek buttons and allow double-tap to seek on mobile.         |
| sources              | Object/Array   | -       | Source of videos to be played.                                               |
| volume               | Number         | -       | Video's volume, between 0 to 1.                                              |

You can also use other props not listed here,
but appear as [VideoJS's options](https://docs.videojs.com/tutorial-options.html#playbackrates).
However, changing props will not effective after the player is created.

### Source Object

The `sources` object has 2 required fields, and more optional field:

| Name    | Type   | Description                            |
|---------|--------|----------------------------------------|
| src     | String | URL to the video.                      |
| type    | String | Video content type.                    |
| title   | String | Video title to display on the player.  |
| videoId | String | Video's ID, usaully used on Analytics. |
| poster  | String | Poster image URL for the video.        |

To provide multiple version of sources, you can use array of source objects.

## Callback Props

We also provide some callback properties, so you can inject some behaviours
directly to the ByteArk Player, and also, to the VideoJS's instance.

| Name                 | Type     | Callback Parameters   | Description                                                                 |
|----------------------|----------|-----------------------|-----------------------------------------------------------------------------|
| onPlayerCreated      | Function | `(player)`            | Callback function to be called when a player instance is created.           |
| onPlayerLoadingError | Function | `({ code, message })` | Callback function to be called when there're an error about loading player. |
| onReady              | Function | `(player)`            | Callback function to be called when a player instance is ready.             |

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


## API Methods

### `getPlayer()`

Return a player instance, if it is created.

## Advanced Usages

### Controlling Players

You may access the player directly via `getPlayer()` method,
or using the player instance that sent from `onReady` callback.

```jsx
// This following example allows user to play/pause the video playback
// from custom buttons outside.

import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'

const App = () => {
  const playerOptions = {
    autoplay: true,
    fluid: true,
    sources: {
      src: 'https://video.example.com/path/to/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      // Optional
      title: 'Video Title'
    }
  }

  let playerInstance = null
  const onReady = (newPlayerInstance) => {
    playerInstance = newPlayerInstance
  }

  return <div>
    <ByteArkPlayerContainer {...playerOptions} />
    <button onClick={() => playerInstance.play()}>Play</button>
    <button onClick={() => playerInstance.pause()}>Pause</button>
  </div>
}

render(<App />, document.getElementById('root'))
```

### Using VideoJS Plugins

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'

const App = () => {
  const playerOptions = {
    autoplay: true,
    fluid: true,
    sources: {
      src: 'https://video.example.com/path/to/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      // Optional
      title: 'Video Title'
    }
  }

  const onReady = (newPlayerInstance) => {
    // The player is ready! Initialize plugins here.
  }

  return <ByteArkPlayerContainer {...playerOptions} />
}

render(<App />, document.getElementById('root'))
```

### Request Media/Encryption with credentials

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ByteArkPlayerContainer } from 'byteark-player-react'

const App = () => {
  const playerOptions = {
    autoplay: true,
    fluid: true,
    sources: {
      src: 'https://video.example.com/path/to/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      // Optional
      title: 'Video Title'
    },
    html5: {
      hlsjs: {
        xhrSetup: function(xhr, url) {
          xhr.withCredentials = true
        }
      }
    }
  }

  const onReady = (newPlayerInstance) => {
    // The player is ready! Initialize plugins here.
  }

  return <ByteArkPlayerContainer {...playerOptions} />
}



## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
