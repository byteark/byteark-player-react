import React from 'react'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import Hero from './Hero.js'

const SampleBlogPage = () => {
  const options = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg',
    sources: {
      src: 'https://inox-bhm9yr.cdn.byteark.com/video-objects/RI2PimuHxDXw/playlist.m3u8',
      type: 'application/x-mpegURL',
      title: 'Big Buck Bunny'
    }
  }

  return (
    <div className="container" style={{maxWidth: '800px'}}>
      <div className="row">
        <div className="col-12">
          <Hero />
          <section className="mt-4 mb-4">
            <p>
              Welcome! This is an example for ByteArk Player Container for React.
              For the repository, see <a href="https://github.com/byteark/byteark-player-react">https://github.com/byteark/byteark-player-react</a>
            </p>
          </section>
          <section className="mt-4 mb-4">
            <h2 className="h5">Examples</h2>
            <p>
              The following is the most common example for videos that inline with your content.
              This player is created with fluid layout mode, and setting aspect ratio to 16:9.
            </p>
            <div className="player-container mt-4 mb-4" style={{position: 'relative'}}>
              <ByteArkPlayerContainer { ...options } />
            </div>
          </section>
          <section className="mt-4 mb-4">
            <h2 className="h5">More Examples</h2>
            <ul>
              <li><a href="#/fluid">Fluid Layout</a></li>
              <li><a href="#/fill">Fill Layout</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default SampleBlogPage
