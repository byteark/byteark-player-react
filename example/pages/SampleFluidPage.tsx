import React, { useState } from 'react'
import { ByteArkPlayerContainer } from '../../src'
import { SiteNav, VideoList, VideoInfo } from '../components'
import { videos } from '../videos'
import type { ByteArkPlayerContainerProps } from '../../src/types'

const SampleFluidPage = () => {
  const [video, setVideo] = useState(videos[0])

  const options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: video.poster,
    sources: [
      {
        src: video.src,
        type: video.type,
        title: video.title
      }
    ],
    onPlayerCreated: () => {
      console.log('Created!')
    },
    onReady: () => {
      console.log('Ready!')
    }
  }

  return (
    <React.Fragment>
      <SiteNav />
      <div className='container'>
        <h4 className='mt-4'>Fluid Layout Example</h4>
        <div className='row mt-4'>
          <div className='col-sm-8' style={{ position: 'relative' }}>
            <div className='player-container' style={{ position: 'relative' }}>
              <ByteArkPlayerContainer {...options} />
            </div>
            <div className='mt-4'>
              <VideoInfo title={video.title} description={video.description} />
            </div>
            <h4 className='mt-4'>Code</h4>
            <pre
              className='mt-4'
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '16px'
              }}
            >
              <code>
                {`function PlayerPage() {
  const options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: '${video.poster}',
    sources: [
      {
        src: '${video.src}',
        type: '${video.type}',
        title: '${video.title}'
      }
    ],
    onPlayerCreated: () => {
      console.log('Created!')
    },
    onReady: () => {
      console.log('Ready!')
    }
  }

  return <ByteArkPlayerContainer {...options} />
}
`}
              </code>
            </pre>
          </div>
          <div className='col-sm-4'>
            <VideoList videos={videos} onVideoSelected={setVideo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SampleFluidPage
