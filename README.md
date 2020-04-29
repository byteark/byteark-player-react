# ByteArk Player Container for React

[![NPM](https://img.shields.io/npm/v/byteark-player-react.svg)](https://www.npmjs.com/package/byteark-player-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
    sources: {
      src: 'https://video.example.com/path/to/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      // Optional
      title: 'Video Title'
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
| sources              | Object/Array   | -       | Source of videos to be played.                                               |
| volume               | Number         | -       | Video's volume, between 0 to 1.                                              |

### Source Props

The `sources` object has 2 fields:

| Name | Type   | Description         |
|------|--------|---------------------|
| src  | String | URL to the video.   |
| type | String | Video content type. |

To provide multiple version of sources, you can use array of source objects.

## Callback Props

We also provide some callback properties, so you can inject some behaviours
directly to the ByteArk Player, and also, to the VideoJS's instance.

| Name                 | Type     | Callback Parameters   | Description                                                                 |
|----------------------|----------|-----------------------|-----------------------------------------------------------------------------|
| onPlayerCreated      | Function | `(player)`            | Callback function to be called when a player instance is created.           |
| onPlayerLoadingError | Function | `({ code, message })` | Callback function to be called when there're an error about loading player. |
| onReady              | Function | `(player)`            | Callback function to be called when a player instance is ready.             |

## Advance Props

We also provide some ways to custom the appearance of the video placeholder,
and some advance behaviours.

| Name                      | Type     | Description                                                                     |
|---------------------------|----------|---------------------------------------------------------------------------------|
| createPlaceholderFunction | Function | Custom video placeholder. This function should return a React component.        |
| createPlayerFunction      | Function | Custom video instance. This function should return a VideoJS's player instance. |
| playerEndpoint            | String   | Endpoint to the video player (without version part).                            |
| playerJsFileName          | String   | File name of player's JS.                                                       |
| playerCssFileName         | String   | File name of player's CSS.                                                      |

## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
