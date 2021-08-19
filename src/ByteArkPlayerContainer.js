import React, { useState, useEffect } from 'react'
import PlayerPlaceholder from './PlayerPlaceholder.js'
import loadScriptOrStyle from './loadScriptOrStyle.js'
import updatePlayerProps from './updatePlayerProps.js'

const defaultCreatePlaceholderFunction = (props, state, onClickPlaceholder) => {
  return (
    <PlayerPlaceholder
      aspectRatio={props.aspectRatio}
      onClick={onClickPlaceholder}
      className={props.className}
      error={state.error}
      loaded={state.loaded}
      playerOptions={props}
    />
  )
}

const defaultCreatePlayerFunction = (videoNode, options, onReady) => {
  return bytearkPlayer.init(videoNode, options, onReady)
}

const defaultSetupPlayerFunction = async (
  options,
  loaderFunction,
  loadPluginOptions
) => {
  await bytearkPlayer.setup(options, loaderFunction, loadPluginOptions)
}

const defaultProps = {
  autoplay: true,
  controls: true,
  autoplayadsmuted: false,
  createPlaceholderFunction: defaultCreatePlaceholderFunction,
  createPlayerFunction: defaultCreatePlayerFunction,
  setupPlayerFunction: defaultSetupPlayerFunction,
  playerEndpoint: 'https://byteark-sdk.cdn.byteark.com/player-core/',
  playerVersion: 'v2',
  playerJsFileName: 'byteark-player.min.js',
  playerCssFileName: 'byteark-player.min.css',
  playsinline: true,
  techCanOverridePoster: false
}

const ByteArkPlayerContainer = (props) => {
  const [showPlaceholder, setShowPlaceholderState] = useState(true)
  const [loaded, setLoadedState] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [ready, setReadyState] = useState(false)
  const [error, setErrorState] = useState(null)
  const [videoNode, setVideoNode] = useState(null)
  let player = null
  let initializeInProgress = false

  const playerOptions = {
    ...defaultProps,
    ...props
  }

  // const player = () => {
  //   return player;
  // }

  // const loaded = () => {
  //   return loaded
  // }

  // const ready = () => {
  //   return ready
  // }

  // const error = () => {
  //   return error
  // }

  const onPlayerLoaded = () => {
    if (playerOptions.onPlayerLoaded) {
      try {
        playerOptions.onPlayerLoaded()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onPlayerLoadError = (error, originalError) => {
    setErrorState(error)

    if (playerOptions.onPlayerLoadError) {
      try {
        playerOptions.onPlayerLoadError(error, originalError)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onPlayerSetup = () => {
    setLoadedState(true)

    if (playerOptions.onPlayerSetup) {
      playerOptions.onPlayerSetup()
    }
  }

  const onPlayerSetupError = (error, originalError) => {
    setErrorState(error)

    if (playerOptions.onPlayerSetupError) {
      try {
        playerOptions.onPlayerSetupError(error, originalError)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onPlayerCreated = () => {
    if (playerOptions.autoplay || player) {
      setShowPlaceholderState(false)
    }

    if (playerOptions.onPlayerCreated) {
      playerOptions.onPlayerCreated(player)
    }
  }

  const onReady = () => {
    setReadyState(true)

    if (playerOptions.onReady) {
      playerOptions.onReady(player)
    }
  }

  const initializePlayer = async () => {
    // We'll not create a real player on server-side rendering.
    const isClient = canUserDOM()
    if (!isClient) {
      return
    }

    // Prevent double initialize
    if (initializeInProgress) {
      return
    }

    initializeInProgress = true
    try {
      await loadPlayerResources()
      await setupPlayer()
      await createPlayerInstance()
      initializeInProgress = false
    } catch (err) {
      initializeInProgress = false
      throw err
    }
  }

  const loadPlayerResources = async () => {
    try {
      const promises = []
      if (playerOptions.playerJsFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-script-${playerOptions.playerVersion}`,
            `${playerOptions.playerEndpoint}/${playerOptions.playerVersion}/${playerOptions.playerJsFileName}`,
            'script'
          )
        )
      }
      if (playerOptions.playerCssFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-style-${playerOptions.playerVersion}`,
            `${playerOptions.playerEndpoint}/${playerOptions.playerVersion}/${playerOptions.playerCssFileName}`,
            'style'
          )
        )
      }
      await Promise.all(promises)
    } catch (originalError) {
      onPlayerLoadError(
        {
          code: 'ERROR_BYTEARK_PLAYER_REACT_100001',
          message: 'Sorry, something wrong when loading the video player.',
          messageSecondary: 'Please refresh the page to try again.'
        },
        originalError
      )
      // Rethrow to stop following statements.
      throw originalError
    }
    onPlayerLoaded()
  }

  const setupPlayer = async () => {
    // if (this.setupPlayerPromise) {
    //   return this.setupPlayerPromise
    // }

    try {
      const setupPlayerFunction =
        playerOptions.setupPlayerFunction || defaultSetupPlayerFunction
      await setupPlayerFunction(playerOptions, loadScriptOrStyle)

      onPlayerSetup()
    } catch (originalError) {
      onPlayerSetupError(
        {
          code: 'ERROR_BYTEARK_PLAYER_REACT_100001',
          message: 'Sorry, something wrong when loading the video player.',
          messageSecondary: 'Please refresh the page to try again.'
        },
        originalError
      )
      // Rethrow to stop following statements.
      throw originalError
    }
  }

  const createPlayerInstance = async () => {
    // check can autoplay video
    const autoplayResult_ = await window.bytearkPlayer.canAutoplay(
      playerOptions
    )

    const options = {
      ...playerOptions,
      autoplayResult_,
      autoplay: autoplayResult_.autoplay,
      muted: autoplayResult_.muted
    }

    const createPlayerFunction =
      playerOptions.createPlayerFunction || defaultCreatePlayerFunction
    player = createPlayerFunction(videoNode, options, onReady)

    onPlayerCreated()
  }

  const renderPlaceholder = () => {
    const createPlaceholderFunction =
      playerOptions.createPlaceholderFunction ||
      defaultCreatePlaceholderFunction
    return createPlaceholderFunction(
      playerOptions,
      { loaded, error },
      onClickPlaceholder
    )
  }

  const onClickPlaceholder = () => {
    initializePlayer().then(() => {
      setShowPlaceholderState(false)

      player.play()
    })
  }

  const canUserDOM = () => {
    return (
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  }

  const onVideoNodeCreated = (node) => {
    if (node) {
      setVideoNode(node)
    }
  }

  const renderPlayer = () => {
    // Video element should be there since the start, but hidden.
    const videoStyle = {}
    let videoClasses = ''

    if (playerOptions.className) {
      videoClasses = playerOptions.className
    }

    if (playerOptions.fill === 'fluid') {
      if (playerOptions.aspectRatio === '4:3') {
        videoClasses += ' vjs-4-3'
      }

      if (playerOptions.aspectRatio === '16:9') {
        videoClasses += ' vjs-16-9'
      }
    }

    if (!loaded) {
      videoStyle.display = 'none'
    }

    if (playerOptions.audioOnlyMode) {
      return (
        <audio
          playsInline
          ref={onVideoNodeCreated}
          className={`video-js ${playerOptions.className}`}
          style={videoStyle}
        />
      )
    }

    return (
      <video
        playsInline
        ref={onVideoNodeCreated}
        className={`video-js ${videoClasses}`}
        style={videoStyle}
      />
    )
  }

  useEffect(() => {
    if (!playerOptions.lazyload && videoNode) {
      initializePlayer()
    }

    return () => {
      if (player) {
        player.dispose()
        setReadyState(false)
      }
    }
  }, [videoNode])

  useEffect(() => {
    if (player) {
      updatePlayerProps(player, playerOptions)
    }
  })

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {showPlaceholder ? renderPlaceholder() : null}
      <div style={{ display: showPlaceholder ? 'none' : 'initial' }}>
        {error ? null : renderPlayer()}
      </div>
    </div>
  )
}

export { ByteArkPlayerContainer }
