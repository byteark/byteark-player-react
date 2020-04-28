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

function defaultCreatePlayerFunction(videoNode, options, onPlayerReady) {
  return bytearkPlayer(videoNode, options, onPlayerReady)
}

export class ByteArkPlayerContainer extends React.Component {
  static defaultProps = {
    autoplay: true,
    controls: true,
    createPlaceholderFunction: defaultCreatePlaceholderFunction,
    createPlayerFunction: defaultCreatePlayerFunction,
    playerEndpoint: 'https://byteark-sdk.cdn.byteark.com/player/',
    playerVersion: 'v1',
    playerJsFileName: 'byteark-player.min.js',
    playerCssFileName: 'byteark-player.min.css',
    playsinline: true
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
    this.setState({
      loaded: true
    })

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

  onPlayerCreated = () => {
    if (this.props.onPlayerCreated) {
      this.props.onPlayerCreated(this.player)
    }
  }

  onPlayerReady = () => {
    if (this.props.onPlayerReady) {
      this.props.onPlayerReady(this.player)
    }
  }

  componentDidMount = async () => {
    await this.loadPlayerResources()
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

  createPlayerInstance = () => {
    this.player = this.props.createPlayerFunction(
      this.videoNode,
      this.props,
      this.onPlayerReady
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
