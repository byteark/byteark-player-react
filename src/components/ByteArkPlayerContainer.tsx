import { useEffect, useRef, useState } from 'react'
import { usePrevious } from 'react-use'
import PlayerPlaceholder from './PlayerPlaceholder'
import {
  PLAYER_ENDPOINT,
  PLAYER_SERVER_ENDPOINT,
  PLAYER_VERSION,
  PLAYER_JS_FILENAME,
  PLAYER_CSS_FILENAME
} from '../constants'
import {
  updatePlayerProps,
  checkIfCanUseDOM,
  loadPlayerResources,
  clearPlayerResources,
  setupPlayerOptions,
  setupPlayer,
  createPlayerInstance,
  defaultCreatePlayerFunction,
  defaultSetupPlayerFunction,
  ByteArkPlayerContainerError,
  LoadPlayerResourceError,
  SetupPlayerOptionsError
} from '../utils'
import type {
  ByteArkPlayerContainerProps,
  ByteArkPlayerContainerState,
  ByteArkPlayer,
  ByteArkPlayerError,
  ICreatePlaceholderFunction
} from '../types'

window.bytearkPlayer = window.bytearkPlayer || {}

const defaultCreatePlaceholderFunction: ICreatePlaceholderFunction = (
  props,
  state,
  onClickPlaceholder
) => {
  return (
    <PlayerPlaceholder
      aspectRatio={props.aspectRatio}
      onClick={onClickPlaceholder}
      className={props.className}
      error={state.error}
      loaded={state.loaded}
      playerProps={props}
    />
  )
}

export default function ByteArkPlayerContainer(
  props: ByteArkPlayerContainerProps
) {
  const {
    createPlaceholderFunction = defaultCreatePlaceholderFunction,
    createPlayerFunction = defaultCreatePlayerFunction,
    lazyload = false,
    playerEndpoint = PLAYER_ENDPOINT,
    playerServerEndpoint = PLAYER_SERVER_ENDPOINT,
    playerVersion = PLAYER_VERSION,
    playerJsFileName = PLAYER_JS_FILENAME,
    playerCssFileName = PLAYER_CSS_FILENAME,
    setupPlayerFunction = defaultSetupPlayerFunction,
    ...rest
  } = props

  const previousProps = usePrevious(props)

  const playerRef = useRef<ByteArkPlayer | null>(null)

  const initializeInProgressRef = useRef<boolean>(false)

  const mediaRef = useRef<HTMLMediaElement | null>(null)

  const [playerContainerState, setPlayerContainerState] =
    useState<ByteArkPlayerContainerState>({
      loaded: false,
      ready: false,
      error: null,
      showPlaceholder: true
    })

  const onPlayerLoaded = () => {
    rest.onPlayerLoaded && rest.onPlayerLoaded()
  }

  const onPlayerLoadError = (
    error: ByteArkPlayerContainerError,
    originalError: ByteArkPlayerError | unknown
  ) => {
    setPlayerContainerState((prevState) => ({ ...prevState, error }))

    rest.onPlayerLoadError && rest.onPlayerLoadError(error, originalError)
  }

  const onPlayerSetup = () => {
    setPlayerContainerState((prevState) => ({ ...prevState, loaded: true }))

    rest.onPlayerSetup && rest.onPlayerSetup()
  }

  const onPlayerSetupError = (
    error: ByteArkPlayerContainerError,
    originalError: ByteArkPlayerError | unknown
  ) => {
    setPlayerContainerState((prevState) => ({ ...prevState, error }))

    rest.onPlayerSetupError && rest.onPlayerSetupError(error, originalError)
  }

  const onPlayerCreated = () => {
    setPlayerContainerState((prevState) => ({
      ...prevState,
      showPlaceholder: false
    }))

    if (playerRef.current) {
      rest.onPlayerCreated && rest.onPlayerCreated(playerRef.current)
    }
  }

  const onPlayerReady = () => {
    setPlayerContainerState((prevState) => ({ ...prevState, ready: true }))

    if (playerRef.current) {
      rest.onReady && rest.onReady(playerRef.current)
    }

    if (lazyload) {
      requestAnimationFrame(async () => {
        await playerRef.current?.play()
      })
    }
  }

  const onClickPlaceholder = async () => {
    if (lazyload) {
      await initializePlayer()
    }

    setPlayerContainerState((prevState) => ({
      ...prevState,
      showPlaceholder: false
    }))
  }

  //

  const renderPlaceholder = () =>
    createPlaceholderFunction(
      props,
      {
        error: playerContainerState.error,
        loaded: playerContainerState.loaded
      },
      onClickPlaceholder
    )

  const renderPlayer = () => {
    // The audio/video element should be create since the beginning, but hidden
    const videoStyle = {}

    const videoClasses = []

    if (rest.className) {
      videoClasses.push(rest.className)
    }

    if (rest.fluid) {
      if (rest.aspectRatio === '4:3') {
        videoClasses.push('vjs-4-3')
      } else if (rest.aspectRatio === '16:9') {
        videoClasses.push('vjs-16-9')
      }
    }

    // React.RefAttributes<HTMLAudioElement>.ref?: React.LegacyRef<HTMLAudioElement> | undefined
    // React.RefAttributes<HTMLVideoElement>.ref?: React.LegacyRef<HTMLVideoElement> | undefined
    if (rest.audioOnlyMode) {
      return (
        <audio
          ref={mediaRef}
          className={`video-js ${rest.className}`}
          style={videoStyle}
        />
      )
    }

    return (
      <video
        playsInline
        ref={mediaRef as React.LegacyRef<HTMLVideoElement>}
        className={`video-js ${videoClasses.join(' ')}`}
        style={videoStyle}
      />
    )
  }

  const initializePlayer = async () => {
    // we'll not create a real player on server side rendering
    if (!checkIfCanUseDOM()) {
      return
    }

    // prevent multiple initialization
    if (initializeInProgressRef.current) {
      return
    }

    // setInitializeInProgress(true)
    initializeInProgressRef.current = true

    try {
      await loadPlayerResources({
        playerJsFileName,
        playerCssFileName,
        playerVersion,
        playerEndpoint,
        playerServerEndpoint,
        playerSlugId: rest.playerSlugId
      })

      onPlayerLoaded()

      const options = await setupPlayerOptions(props)

      await setupPlayer(options, setupPlayerFunction)

      onPlayerSetup()

      playerRef.current = await createPlayerInstance(
        mediaRef.current,
        options,
        createPlayerFunction,
        onPlayerReady
      )

      onPlayerCreated()
    } catch (error) {
      if (error instanceof LoadPlayerResourceError) {
        onPlayerSetupError(error, error.originalError)
      } else if (error instanceof SetupPlayerOptionsError) {
        onPlayerLoadError(error, error.originalError)
      } else if (error instanceof ByteArkPlayerContainerError) {
        setPlayerContainerState((prevState) => ({
          ...prevState,
          error: error as ByteArkPlayerContainerError
        }))
      }

      console.error(error)
    } finally {
      // setInitializeInProgress(false)
      initializeInProgressRef.current = false
    }
  }

  useEffect(() => {
    const initIfNotLazyLoad = async () => {
      if (!lazyload) {
        await initializePlayer()
      }
    }

    initIfNotLazyLoad()

    return () => {
      // remove the player instance
      if (playerRef.current) {
        playerRef.current.dispose()

        playerRef.current = null
      }

      // reset state to initial
      setPlayerContainerState((prevState) => ({
        ...prevState,
        loaded: false,
        ready: false,
        error: null,
        showPlaceholder: true
      }))

      // reset the initialize in progress flag
      initializeInProgressRef.current = false

      // remove the player resources
      clearPlayerResources()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (playerRef.current && props && previousProps) {
      updatePlayerProps(playerRef.current, props, previousProps)
    }
  }, [props, previousProps])

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {playerContainerState.showPlaceholder && renderPlaceholder()}
      <div
        style={{
          display: playerContainerState.showPlaceholder ? 'none' : 'initial'
        }}
      >
        {playerContainerState.error === null && renderPlayer()}
      </div>
    </div>
  )
}
