import React, { useState } from 'react'
import { ByteArkPlayerContainer } from '../../src'
import { SiteNav, VideoList, VideoInfo } from '../components'
import { videos } from '../videos'

const SampleFillPage = () => {
  const [video, setVideo] = useState(videos[0])

  const options = {
    fill: true,
    autoplay: false,
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
      <div style={{ position: 'relative', width: '100%', height: '75vh' }}>
        <ByteArkPlayerContainer {...options} />
      </div>
      <SiteNav />
      <div className='container mt-4'>
        <h4 className='mt-4'>Fill Layout Example</h4>
        <div className='row mt-4'>
          <div className='col-sm-8'>
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
    fill: true,
    autoplay: false,
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
          <div className='col-sm-4 mt-1'>
            <VideoList videos={videos} onVideoSelected={setVideo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SampleFillPage
