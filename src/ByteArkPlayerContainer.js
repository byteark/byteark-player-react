import React from 'react'
import { isBrowserSupportDrm } from './drm'
import PlayerPlaceholder from './PlayerPlaceholder'
import loadScriptOrStyle from './loadScriptOrStyle'
import updatePlayerProps from './updatePlayerProps'

function defaultCreatePlaceholderFunction(props, state, onClickPlaceholder) {
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

function defaultCreatePlayerFunction(videoNode, options, onReady) {
  return bytearkPlayer.init(videoNode, options, onReady)
}

async function defaultSetupPlayerFunction(
  options,
  loaderFunction,
  loadPluginOptions
) {
  await bytearkPlayer.setup(options, loaderFunction, loadPluginOptions)
}

export class ByteArkPlayerContainer extends React.Component {
  static defaultProps = {
    autoplay: true,
    controls: true,
    autoplayadsmuted: false,
    createPlaceholderFunction: defaultCreatePlaceholderFunction,
    createPlayerFunction: defaultCreatePlayerFunction,
    setupPlayerFunction: defaultSetupPlayerFunction,
    playerEndpoint: 'https://byteark-sdk.cdn.byteark.com/player-core',
    playerVersion: 'v2',
    playerJsFileName: 'byteark-player.min.js',
    playerCssFileName: 'byteark-player.min.css',
    playsinline: true,
    techCanOverridePoster: false
  }

  constructor(props) {
    super(props)

    this.player = null
    this.state = {
      mounted: false,
      loaded: false,
      ready: false,
      error: null,
      showPlaceholder: true
    }
    this.onClickPlaceholder = this.onClickPlaceholder.bind(this)
  }

  player() {
    return this.player
  }

  loaded() {
    return this.state.loaded
  }

  ready() {
    return this.state.ready
  }

  error() {
    return this.state.error
  }

  onPlayerLoaded = () => {
    if (this.props.onPlayerLoaded) {
      try {
        this.props.onPlayerLoaded()
      } catch (err) {
        console.error(err)
      }
    }
  }

  onPlayerLoadError = (error, originalError) => {
    this.setState({
      error
    })

    if (this.props.onPlayerLoadError) {
      try {
        this.props.onPlayerLoadError(error, originalError)
      } catch (err) {
        console.error(err)
      }
    }
  }

  onPlayerSetup = () => {
    this.setState({
      loaded: true
    })

    if (this.props.onPlayerSetup) {
      this.props.onPlayerSetup()
    }
  }

  onPlayerSetupError = (error, originalError) => {
    this.setState({
      error
    })

    if (this.props.onPlayerSetupError) {
      try {
        this.props.onPlayerSetupError(error, originalError)
      } catch (err) {
        console.error(err)
      }
    }
  }

  onPlayerCreated = () => {
    this.setState({
      showPlaceholder: false
    })

    if (this.props.onPlayerCreated) {
      this.props.onPlayerCreated(this.player)
    }
  }

  onReady = () => {
    this.setState({
      ready: true
    })

    if (this.props.onReady) {
      this.props.onReady(this.player)
    }
  }

  componentDidMount() {
    if (!this.props.lazyload) {
      this.initializePlayer()
    }
  }

  async initializePlayer() {
    // We'll not create a real player on server-side rendering.
    const isClient = this.canUserDOM()
    if (!isClient) {
      return
    }

    // Prevent double initialize
    if (this.initializeInProgress) {
      return
    }

    this.initializeInProgress = true
    try {
      await this.loadPlayerResources()
      await this.setupPlayer()
      await this.createPlayerInstance()
      this.initializeInProgress = false
    } catch (err) {
      this.initializeInProgress = false
      throw err
    }
  }

  async loadPlayerResources() {
    try {
      const promises = []
      if (this.props.playerJsFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-script-${this.props.playerVersion}`,
            `${this.props.playerEndpoint}/${this.props.playerVersion}/${this.props.playerJsFileName}`,
            'script'
          )
        )
      }
      if (this.props.playerCssFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-style-${this.props.playerVersion}`,
            `${this.props.playerEndpoint}/${this.props.playerVersion}/${this.props.playerCssFileName}`,
            'style'
          )
        )
      }
      await Promise.all(promises)
    } catch (originalError) {
      this.onPlayerLoadError(
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
    this.onPlayerLoaded()
  }

  async setupPlayer() {
    if (this.setupPlayerPromise) {
      return this.setupPlayerPromise
    }

    try {
      const setupPlayerFunction =
        this.props.setupPlayerFunction || defaultSetupPlayerFunction
      await setupPlayerFunction(this.props, loadScriptOrStyle)

      this.onPlayerSetup()
    } catch (originalError) {
      this.onPlayerSetupError(
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

  createPlayerInstance = async () => {
    // check can autoplay video
    const autoplayResult_ = await window.bytearkPlayer.canAutoplay(this.props)

    const options = {
      ...this.props,
      autoplayResult_,
      autoplay: autoplayResult_.autoplay,
      muted: autoplayResult_.muted
    }

    window.bytearkPlayer.isBrowserSupportDrm = isBrowserSupportDrm

    const createPlayerFunction =
      this.props.createPlayerFunction || defaultCreatePlayerFunction
    this.player = createPlayerFunction(this.videoNode, options, this.onReady)

    this.onPlayerCreated()
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
      this.setState({
        ready: false
      })
    }
  }

  onVideoNodeCreated = (node) => {
    this.videoNode = node
  }

  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        {this.state.showPlaceholder ? this.renderPlaceholder() : null}
        <div
          style={{ display: this.state.showPlaceholder ? 'none' : 'initial' }}
        >
          {this.state.error ? null : this.renderPlayer()}
        </div>
      </div>
    )
  }

  renderPlaceholder() {
    const createPlaceholderFunction =
      this.props.createPlaceholderFunction || defaultCreatePlaceholderFunction
    return createPlaceholderFunction(
      this.props,
      this.state,
      this.onClickPlaceholder
    )
  }

  renderPlayer() {
    // Video element should be there since the start, but hidden.
    const videoStyle = {}
    let videoClasses = ''

    if (this.props.className) {
      videoClasses = this.props.className
    }

    if (this.props.fill === 'fluid') {
      if (this.props.aspectRatio === '4:3') {
        videoClasses += ' vjs-4-3'
      }

      if (this.props.aspectRatio === '16:9') {
        videoClasses += ' vjs-16-9'
      }
    }

    if (!this.state.loaded) {
      videoStyle.display = 'none'
    }

    if (this.props.audioOnlyMode) {
      return (
        <audio
          playsInline
          ref={this.onVideoNodeCreated}
          className={`video-js ${this.props.className}`}
          style={videoStyle}
        />
      )
    }

    return (
      <video
        playsInline
        ref={this.onVideoNodeCreated}
        className={`video-js ${videoClasses}`}
        style={videoStyle}
      />
    )
  }

  componentDidUpdate(prevProps, prevState) {
    // At this point, we're in the "commit" phase, so it's safe to load the new data.
    if (this.player) {
      updatePlayerProps(this.player, this.props)
    }
  }

  onClickPlaceholder() {
    this.initializePlayer().then(() => {
      this.setState({
        showPlaceholder: false
      })

      this.player.play()
    })
  }

  canUserDOM() {
    return (
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  }
}
