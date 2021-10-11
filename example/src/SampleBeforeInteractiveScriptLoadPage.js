import React, { Fragment } from 'react'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import Hero from './Hero.js'
import SiteNav from './SiteNav.js'

const SampleBeforeInteractiveScriptLoadPage = () => {
  const options = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    scriptLoadstrategy: 'beforeInteractive',
    poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg',
    sources: {
      src: 'https://inox-bhm9yr.cdn.byteark.com/video-objects/RI2PimuHxDXw/playlist.m3u8',
      type: 'application/x-mpegURL',
      title: 'Big Buck Bunny'
    }
  }

  return (
    <Fragment>
    <SiteNav/>
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
              This player is created with fluid layout mode, before interactive script load, and setting aspect ratio to 16:9.
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
              <li><a href="#/lazyOnLoad">Lazy on load script load</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default SampleBeforeInteractiveScriptLoadPage
