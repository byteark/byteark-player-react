import { ByteArkPlayer, ByteArkPlayerOptions } from '../types'

type PlayerPropName = 'autoplay' | 'aspectRatio' | 'breakpoints' | 'controls' | 'fill' | 'fluid' | 'loop' | 'language' | 'muted'
  | 'playsinline' | 'poster' | 'preload' | 'responsive' | 'seekButtons' | 'sources' | 'src'

interface PlayerProps {
  name: PlayerPropName;
  setter?: 'src';
}

const playerProps: PlayerProps[] = [
  {
    name: 'autoplay'
  },
  {
    name: 'aspectRatio'
  },
  {
    name: 'breakpoints'
  },
  {
    name: 'controls'
  },
  // {
  //   name: 'currentTime'
  // },
  {
    name: 'fill'
  },
  {
    name: 'fluid'
  },
  {
    name: 'loop'
  },
  {
    name: 'language'
  },
  {
    name: 'muted'
  },
  // {
  //   name: 'playbackRate'
  // },
  {
    name: 'playsinline'
  },
  {
    name: 'poster'
  },
  {
    name: 'preload'
  },
  {
    name: 'responsive'
  },
  {
    name: 'seekButtons'
  },
  {
    name: 'sources',
    setter: 'src'
  }
  // {
  //   name: 'volume'
  // }
]

export default function updatePlayerProps(player: ByteArkPlayer, nextProps: ByteArkPlayerOptions) {
  playerProps.forEach(({ name, setter }) => {
    const effectiveSetter: PlayerPropName = (setter || name) as PlayerPropName
    const selectedPlayerProperty = player[effectiveSetter]

    if (typeof selectedPlayerProperty === 'function') {
      /**
       * Sakorn's Note: I use 'any' here because setter functions have their own prop with a different type,
       * e.g. some function accepts a string, while some function accepts a boolean. It causes type errors.
       */
      selectedPlayerProperty(nextProps[name] as any)
    }
  })
}
