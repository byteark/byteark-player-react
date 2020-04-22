import React, { useState } from 'react'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import SiteNav from './SiteNav.js'
import VideoList from './VideoList.js'
import VideoInfo from './VideoInfo.js'
import videos from './videos.js'

const SampleFluidApp = () => {
  const [video, setVideo] = useState(videos[0])

  const options = {
    fluid: true,
    aspectRatio: '16:9',
    onPlayerCreated: () => {
      console.log('Created!')
    },
    onPlayerReady: () => {
      console.log('Ready!')
    }
  }

  return (
    <React.Fragment>
      <SiteNav />
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-8">
            <ByteArkPlayerContainer
              sources={video}
              poster={video.poster}
              { ...options }
            />
            <div className="mt-4">
              <VideoInfo title={video.title} description={video.description} />
            </div>
            <code>
            </code>
          </div>
          <div className="col-sm-4">
            <VideoList videos={videos} onVideoSelected={setVideo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SampleFluidApp
