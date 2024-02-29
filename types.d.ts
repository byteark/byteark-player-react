declare module 'byteark-player-react' {
  import { ComponentType } from 'react'
  import type { ByteArkPlayerOptions } from './src/types'

  const ByteArkPlayerContainer: ComponentType<ByteArkPlayerOptions & Record<string, any>>

  export { ByteArkPlayerContainer }
}
