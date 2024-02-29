import React, { useEffect, useRef, useState } from 'react'
import { isBrowserSupportDrm } from './drm'
import PlayerPlaceholder from './PlayerPlaceholder'
import loadScriptOrStyle from './loadScriptOrStyle'
import type {
  ByteArkPlayer,
  ByteArkPlayerOptions,
  ByteArkPlayerWithAutoplayResult,
  DefaultCreatePlaceholderFunction,
  DefaultCreatePlayerFunction,
  DefaultSetupPlayerFunction,
  LoadErrorMessageProps
} from '../types'
import updatePlayerProps from './updatePlayerProps'

const defaultCreatePlaceholderFunction: DefaultCreatePlaceholderFunction = (props, state, onClickPlaceholder) => {
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

const defaultCreatePlayerFunction: DefaultCreatePlayerFunction = (videoNode, options, onReady) => {
  if (window.bytearkPlayer.initAsync) {
    return window.bytearkPlayer.initAsync(videoNode, options, onReady)
  }
  return window.bytearkPlayer.init(videoNode, options, onReady)
}

const defaultSetupPlayerFunction: DefaultSetupPlayerFunction = async (
  options,
  loaderFunction,
  loadPluginOptions
) => {
  await window.bytearkPlayer.setup(options, loaderFunction, loadPluginOptions)
}

export function ByteArkPlayerContainer(props: ByteArkPlayerOptions) {
  const {
    createPlaceholderFunction = defaultCreatePlaceholderFunction,
    createPlayerFunction = defaultCreatePlayerFunction,
    lazyload = false,
    playerEndpoint = 'https://byteark-sdk.cdn.byteark.com/player-core',
    playerServerEndpoint = 'https://player.byteark.com/players',
    playerVersion = 'v2',
    playerJsFileName = 'byteark-player.min.js',
    playerCssFileName = 'byteark-player.min.css',
    setupPlayerFunction = defaultSetupPlayerFunction,
    ...rest
  } = props

  interface State {
    mounted: boolean;
    loaded: boolean;
    ready: boolean;
    error: LoadErrorMessageProps | null;
    showPlaceholder: boolean;
  }

  const [player, setPlayer] = useState<ByteArkPlayer | null>(null)
  const [initializeInProgress, setInitializeInProgress] = useState<boolean>(false)
  const [playerState, setPlayerState] = useState<State>({
    mounted: false,
    loaded: false,
    ready: false,
    error: null,
    showPlaceholder: true
  })

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // constructor(props) {
  //   this.onClickPlaceholder = this.onClickPlaceholder.bind(this)
  // }

  // player() {
  //   return this.player
  // }
  //
  // loaded() {
  //   return playerState.loaded
  // }
  //
  // ready() {
  //   return playerState.ready
  // }
  //
  // error() {
  //   return playerState.error
  // }

  const onPlayerLoaded = () => {
    if (typeof rest.onPlayerLoaded === 'function') {
      try {
        rest.onPlayerLoaded()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onPlayerLoadError = (error: LoadErrorMessageProps, originalError: any) => {
    setPlayerState((prevState) => ({ ...prevState, error }))

    if (typeof rest.onPlayerLoadError === 'function') {
      try {
        rest.onPlayerLoadError(error, originalError)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onPlayerSetup = () => {
    setPlayerState((prevState) => ({ ...prevState, loaded: true }))

    if (rest.onPlayerSetup) {
      rest.onPlayerSetup()
    }
  }

  const onPlayerSetupError = (error: LoadErrorMessageProps, originalError: any) => {
    setPlayerState((prevState) => ({ ...prevState, error }))

    if (rest.onPlayerSetupError) {
      try {
        rest.onPlayerSetupError(error, originalError)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onPlayerCreated = () => {
    setPlayerState((prevState) => ({ ...prevState, showPlaceholder: false }))

    if (rest.onPlayerCreated && player) {
      rest.onPlayerCreated(player)
    }
  }

  const onReady = () => {
    setPlayerState((prevState) => ({ ...prevState, ready: true }))

    if (rest.onReady && player) {
      rest.onReady(player)
    }
  }

  const checkIfCanUseDOM = (): boolean => (
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement !== undefined
  )

  const loadPlayerResources = async () => {
    try {
      const promises = []
      if (rest.playerSlugId) {
        if (playerJsFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-script-${rest.playerSlugId}`,
              `${playerServerEndpoint}/${rest.playerSlugId}/libraries/${playerJsFileName}`,
              'script'
            )
          )
        }
        if (playerCssFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-style-${rest.playerSlugId}`,
              `${playerServerEndpoint}/${rest.playerSlugId}/libraries/${playerCssFileName}`,
              'style'
            )
          )
        }
      } else {
        if (playerJsFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-script-${playerVersion}`,
              `${playerEndpoint}/${playerVersion}/${playerJsFileName}`,
              'script'
            )
          )
        }
        if (playerCssFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-style-${playerVersion}`,
              `${playerEndpoint}/${playerVersion}/${playerCssFileName}`,
              'style'
            )
          )
        }
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

  const setupOptions = async (): Promise<ByteArkPlayerWithAutoplayResult> => {
    try {
      const autoplayResult = await window.bytearkPlayer.canAutoplay(props)
      const resultPlayerOptions = {
        ...props,
        autoplayResult_: autoplayResult
      }
      return resultPlayerOptions
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

  const setupPlayer = async (resultOptions: ByteArkPlayerWithAutoplayResult) => {
    try {
      await setupPlayerFunction(resultOptions, loadScriptOrStyle)
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

  const createPlayerInstance = async (resultOptions: ByteArkPlayerWithAutoplayResult) => {
    if (!videoRef.current || !audioRef.current) {
      return
    }

    window.bytearkPlayer.isBrowserSupportDrm = isBrowserSupportDrm
    const createdPlayer = await createPlayerFunction(
      videoRef.current ?? audioRef.current,
      resultOptions,
      onReady
    )

    setPlayer(createdPlayer)
    onPlayerCreated()
  }

  const initializePlayer = async () => {
    // We'll not create a real player on server-side rendering.
    const isClient = checkIfCanUseDOM()
    if (!isClient) {
      return
    }

    // Prevent double initialize
    if (initializeInProgress) {
      return
    }

    setInitializeInProgress(true)

    try {
      await loadPlayerResources()
      const resultOptions = await setupOptions()
      await setupPlayer(resultOptions)
      await createPlayerInstance(resultOptions)
    } catch (err) {
      console.error(err)
    } finally {
      setInitializeInProgress(false)
    }
  }

  const onClickPlaceholder = async () => {
    await initializePlayer()

    setPlayerState((prevState) => ({ ...prevState, showPlaceholder: false }))

    if (player) {
      player.play()
    }
  }

  const renderPlaceholder = () => createPlaceholderFunction(props, {
    error: playerState.error,
    loaded: playerState.loaded
  }, onClickPlaceholder)

  const renderPlayer = () => {
    // Video element should be there since the start, but hidden.
    const videoStyle = {}
    let videoClasses = ''

    if (rest.className) {
      videoClasses = rest.className
    }

    if (rest.fluid) {
      if (rest.aspectRatio === '4:3') {
        videoClasses += ' vjs-4-3'
      }

      if (rest.aspectRatio === '16:9') {
        videoClasses += ' vjs-16-9'
      }
    }

    if (rest.audioOnlyMode) {
      return (
        <audio
          ref={audioRef}
          className={`video-js ${rest.className}`}
          style={videoStyle}
        />
      )
    }

    return (
      <video
        playsInline
        ref={videoRef}
        className={`video-js ${videoClasses} ${rest.className}`}
        style={videoStyle}
      />
    )
  }

  useEffect(() => {
    const initIfNotLazyload = async () => {
      if (!lazyload) {
        await initializePlayer()
      }
    }

    initIfNotLazyload()

    return () => {
      if (player) {
        player.dispose()
        setPlayerState((prevState) => ({ ...prevState, ready: false }))
      }
    }
  }, [])

  useEffect(() => {
    if (player) {
      updatePlayerProps(player, props)
    }
  }, [player, props])

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {playerState.showPlaceholder ? renderPlaceholder() : null}
      <div
        style={{
          display:
            playerState.showPlaceholder || !playerState.loaded
              ? 'none'
              : 'initial'
        }}
      >
        {playerState.error ? null : renderPlayer()}
      </div>
    </div>
  )
}
