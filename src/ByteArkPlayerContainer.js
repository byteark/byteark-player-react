import React from 'react'
import PlayerPlaceholder from './PlayerPlaceholder.js'
import loadScriptOrStyle from './loadScriptOrStyle.js'
import updatePlayerProps from './updatePlayerProps.js'

function defaultCreatePlaceholderFunction(props, { error }) {
  return (
    <PlayerPlaceholder
      className={props.className}
      aspectRatio={props.aspectRatio}
      error={error}
      fill={props.fill}
      fluid={props.fluid}
    />
  )
}

function defaultCreatePlayerFunction(videoNode, options, onReady) {
  return bytearkPlayer.init(videoNode, options, onReady)
}

async function defautlSetupPlayerFunction(
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
    setupPlayerFunction: defautlSetupPlayerFunction,
    playerEndpoint: 'https://byteark-sdk.cdn.byteark.com/player-core/',
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
      loaded: false,
      ready: false,
      error: null
    }
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
    if (this.props.onPlayerCreated) {
      this.props.onPlayerCreated(this.player)
    }
  }

  onReady = () => {
    if (this.props.onReady) {
      this.props.onReady(this.player)
    }
  }

  componentDidMount = async () => {
    await this.loadPlayerResources()
    await this.setupPlayer()
    await this.createPlayerInstance()
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
    try {
      await this.props.setupPlayerFunction(this.props, loadScriptOrStyle)

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

    this.player = this.props.createPlayerFunction(
      this.videoNode,
      options,
      this.onReady
    )

    this.onPlayerCreated()
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
      this.ready = false
    }
  }

  onVideoNodeCreated = (node) => {
    this.videoNode = node
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? null : this.renderPlaceholder()}
        {this.state.error ? null : this.renderPlayer()}
      </React.Fragment>
    )
  }

  renderPlaceholder() {
    return this.props.createPlaceholderFunction(this.props, this.state)
  }

  renderPlayer() {
    // Video element should be there since the start, but hidden.
    const videoStyle = {}
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
        className={`video-js ${this.props.className}`}
        style={videoStyle}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    if (!this.player) {
      return
    }
    updatePlayerProps(this.player, this.props, nextProps)
  }
}
