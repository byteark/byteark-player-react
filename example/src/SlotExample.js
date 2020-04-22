import React from 'react'

import { ByteArkPlayerContainer } from 'byteark-player-react'
import 'byteark-player-react/dist/index.css'

const App = () => {
  const options = {
    fluid: true,
    poster: 'https://qoder.byteark.com/images/video-frames/1/Eh/Ly/1EhLy71geyne-large.jpg',
    sources: [{
      src: 'http://inox.qoder.byteark.com/video-objects/QbmYt4Ofo9U/playlist.m3u8',
      type: 'application/x-mpegURL'
    }],
    onPlayerReady: () => {
      console.log('Ready!')
    }
  }

  return (
    <div className="container">
        <header className="blog-header py-3 mb-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
            </div>
            <div className="col-4 text-center">
              <a className="blog-header-logo text-dark" href="#">ByteArk Player React Examples</a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="text-muted" href="#" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24" focusable="false"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
              </a>
              <a className="btn btn-sm btn-outline-secondary" href="#">Sign up</a>
            </div>
          </div>
        </header>
        <div className="row">
        <div className="col-sm-9">
          <ByteArkPlayerContainer { ...options } />
          <div class="mt-3"></div>
          <h1 class="h4">This is YouTube!</h1>
          <h2 class="h6">ตัวอย่างโค้ด</h2>
          <code>
          </code>
        </div>
        <div className="col-sm-3">
          <h2 class="h6">ตัวอย่างการใช้งานรูปแบบอื่นๆ</h2>
        </div>
      </div>
    </div>
  )
}

export default App
