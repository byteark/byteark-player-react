import { ByteArkPlayerContainer } from '../../src'
import { videos } from '../videos'
import type { ByteArkPlayerContainerProps } from '../../src/types'

const SampleFullPage = () => {
  const options: ByteArkPlayerContainerProps = {
    fill: true,
    autoplay: false,
    poster: videos[0].poster,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title
      }
    ]
  }

  return (
    <div
      style={{
        backgroundColor: '#000',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      <ByteArkPlayerContainer {...options} />
    </div>
  )
}

export default SampleFullPage
