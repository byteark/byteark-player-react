import React, { useState } from 'react'
import { ByteArkPlayerContainer } from 'byteark-player-react'
import SiteNav from './SiteNav.js'
import VideoList from './VideoList.js'
import VideoInfo from './VideoInfo.js'
import videos from './videos.js'

const SampleFillApp = () => {
  const [video, setVideo] = useState(videos[0])

  const options = {
    fill: true,
    onPlayerCreated: () => {
      console.log('Created!')
    },
    onPlayerReady: () => {
      console.log('Ready!')
    }
  }

  return (
    <React.Fragment>
      <div style={{width: '100%', height: '75vh'}}>
        <ByteArkPlayerContainer
          sources={video}
          poster={video.poster}
          { ...options }
        />
      </div>
      <SiteNav />
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-8 mt-1">
            <VideoInfo title={video.title} description={video.description} />
          </div>
          <div className="col-sm-4 mt-1">
            <VideoList videos={videos} onVideoSelected={setVideo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SampleFillApp
