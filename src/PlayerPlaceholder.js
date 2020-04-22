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
  const placeholderCustomStyle = {
    position: 'relative',
    width: '100%',
    minWidth: '100%',
    backgroundColor: '#000000'
  }

  if (props.fluid) {
    placeholderCustomStyle.paddingTop = `${calculatePlaceholderPaddingTopFromAspectRatio(
      props.aspectRatio || '16:9'
    )}%`
  }
  if (!props.fluid && props.fill) {
    placeholderCustomStyle.height = '100%'
    placeholderCustomStyle.minHeight = '100%'
  }

  return (
    <div className={props.className} style={placeholderCustomStyle}>
      {props.error ? <PlayerLoadErrorMessage {...props.error} /> : null}
    </div>
  )
}
