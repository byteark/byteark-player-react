import React from 'react';

import { ByteArkPlayerContainer } from '../../src';
import { SiteNav, VideoInfo } from '../components';
import { videos } from '../videos';

import type { ByteArkPlayerContainerProps } from '../../src/types';

const SampleLazyLoadPage = () => {
  const options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    lazyload: true,
    aspectRatio: '16:9',
    poster: videos[0].poster,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
    onPlayerCreated: () => {
      console.log('Created!');
    },
    onReady: () => {
      console.log('Ready!');
    },
  };

  return (
    <React.Fragment>
      <SiteNav />
      <div className='container'>
        <h4 className='mt-4'>Lazy Load Player Example</h4>
        <div className='row mt-4'>
          <div className='col' style={{ position: 'relative' }}>
            <div className='player-container' style={{ position: 'relative' }}>
              <ByteArkPlayerContainer {...options} />
            </div>
            <div className='mt-4'>
              <VideoInfo title={videos[0].title} description={videos[0].description} />
            </div>
            <h4 className='mt-4'>Code</h4>
            <pre
              className='mt-4'
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '16px',
              }}
            >
              <code>
                {`function PlayerPage() {
  const options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    lazyload: true,
    aspectRatio: '16:9',
    poster: '${videos[0].poster}',
    sources: [
      {
        src: '${videos[0].src}',
        type: '${videos[0].type}',
        title: '${videos[0].title}'
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default SampleLazyLoadPage;
