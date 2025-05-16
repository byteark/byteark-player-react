import { Link } from 'react-router-dom';

import { ByteArkPlayerContainer } from '../../src';
import { SiteHeader } from '../components';
import { videos } from '../videos';

import type { ByteArkPlayerContainerProps } from '../../src/types';

const SampleBlogPage = () => {
  const options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: videos[0].poster,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
  };

  return (
    <div className='container' style={{ maxWidth: '800px' }}>
      <div className='row'>
        <div className='col-12'>
          <SiteHeader />
          <section className='mt-4 mb-4'>
            <p>
              Welcome! This is an example for ByteArk Player Container for React. For the repository, see{' '}
              <a href='https://github.com/byteark/byteark-player-react'>
                https://github.com/byteark/byteark-player-react
              </a>
            </p>
          </section>
          <section className='mt-4 mb-4'>
            <h2 className='h5'>Examples</h2>
            <p>
              The following is the most common example for videos that inline with your content. This player is created
              with fluid layout mode, and setting aspect ratio to 16:9.
            </p>
            <div className='player-container mt-4 mb-4' style={{ position: 'relative' }}>
              <ByteArkPlayerContainer {...options} />
            </div>
          </section>
          <section className='mt-4 mb-4'>
            <h2 className='h5'>More Examples</h2>
            <ul>
              <li>
                <Link to='/fluid'>Fluid Layout</Link>
              </li>
              <li>
                <Link to='/fill'>Fill Layout</Link>
              </li>
              <li>
                <Link to='/full'>Full Page Layout</Link>
              </li>
              <li>
                <Link to='/lazyload'>Lazy Load Player</Link>
              </li>
              <li>
                <Link to='/autoplay'>Autoplay</Link>
              </li>
              <li>
                <Link to='/ads'>Advertisement</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SampleBlogPage;
