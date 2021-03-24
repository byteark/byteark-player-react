import React from 'react'
import PlayerLoadErrorMessage from './PlayerLoadErrorMessage.js'

function calculatePlaceholderPaddingTopFromAspectRatio(aspectRatio) {
  if (typeof aspectRatio === 'number') {
    return aspectRatio
  }
  const [hStr, vStr] = aspectRatio.split(':')
  return (Number.parseFloat(vStr) / Number.parseFloat(hStr)) * 100
}

export default function PlayerPlaceholder(props) {
  const options = props.playerOptions

  const placeholderCustomStyle = {
    position: 'absolute',
    width: '100%',
    minWidth: '100%',
    background: `url(${options.poster})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer'
  }

  const playIconStyle = {
    position: 'absolute',
    width: '90px',
    top: '50%',
    left: '50%',
    marginTop: '-2.75em',
    marginLeft: '-2.75em',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '50%'
  }

  const pathStyle = {
    fill: '#FFF',
    transform: 'translateX(13px) translateY(9px) scale(0.7)'
  }

  if (options.fluid) {
    placeholderCustomStyle.paddingTop = `${calculatePlaceholderPaddingTopFromAspectRatio(
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

  return (
    <div
      onClick={props.onClick}
      className={props.className}
      style={placeholderCustomStyle}
    >
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
      {props.error ? <PlayerLoadErrorMessage {...props.error} /> : null}
    </div>
  )
}
