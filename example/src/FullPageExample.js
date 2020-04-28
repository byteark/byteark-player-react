import React from 'react'

import { ByteArkPlayerContainer } from 'byteark-player-react'

const App = () => {
  const options = {
    fill: true,
    poster: 'https://qoder.byteark.com/images/video-frames/1/Eh/Ly/1EhLy71geyne-large.jpg',
    sources: [{
      src: 'http://inox.qoder.byteark.com/video-objects/QbmYt4Ofo9U/playlist.m3u8',
      type: 'application/x-mpegURL'
    }],
    onPlayerCreated: () => {
      console.log('Created!')
    },
    onPlayerReady: () => {
      console.log('Ready!')
    }
  }

  return (
    <div className="appContainer" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
      <ByteArkPlayerContainer containerType="full" { ...options } />
    </div>
  )
}

export default App
