import React, { CSSProperties } from 'react'
import { PlayerPlaceholderProps } from '../types'
import PlayerLoadErrorMessage from './PlayerLoadErrorMessage'

function getPlaceholderPaddingTopFromAspectRatio(aspectRatio: unknown): number {
  if (typeof aspectRatio === 'number') {
    return aspectRatio
  }

  if (typeof aspectRatio !== 'string') {
    return 0
  }

  const [hStr, vStr] = aspectRatio.split(':')
  return (Number.parseFloat(vStr) / Number.parseFloat(hStr)) * 100
}

export default function PlayerPlaceholder(props: PlayerPlaceholderProps) {
  const options = props.playerOptions

  const placeholderCustomStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    minWidth: '100%',
    background: '#000000',
    backgroundImage: `url(${options.poster})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer'
  }

  const playIconStyle: CSSProperties = {
    position: 'absolute',
    width: '90px',
    top: '50%',
    left: '50%',
    marginTop: '-2.75em',
    marginLeft: '-2.75em',
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '50%'
  }

  const pathStyle: CSSProperties = {
    fill: '#FFF',
    transform: 'translateX(13px) translateY(9px) scale(0.7)'
  }

  if (options.fluid) {
    placeholderCustomStyle.paddingTop = `${getPlaceholderPaddingTopFromAspectRatio(
      props.aspectRatio || '16:9'
    )}%`
  }
  if (!options.fluid && options.fill) {
    placeholderCustomStyle.height = '100%'
    placeholderCustomStyle.minHeight = '100%'
  }

  if (options.lazyload && !props.loaded) {
    placeholderCustomStyle.position = 'relative'
  }
  if (options.lazyload && props.loaded) {
    placeholderCustomStyle.position = 'absolute'
  }

  const shouldShowPlayIcon =
    options.controls === undefined ||
    options.controls === null ||
    options.controls === true

  return (
    <div
      onClick={props.onClick}
      className={props.className}
      style={placeholderCustomStyle}
    >
      {shouldShowPlayIcon
        ? (
          <svg
            className='play-icon'
            width='90'
            viewBox='0 0 60 60'
            style={playIconStyle}
          >
            <path
              style={pathStyle}
              d='M47.43,27.26,14.11,5.87A3.34,3.34,0,0,0,9,8.79V51.56a3.34,3.34,0,0,0,5.11,2.91L47.43,33.09A3.49,3.49,0,0,0,47.43,27.26Z'
            />
          </svg>
          )
        : null}
      {props.error ? <PlayerLoadErrorMessage {...props.error} /> : null}
    </div>
  )
}
