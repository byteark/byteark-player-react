import React, { CSSProperties } from 'react'
import { LoadErrorMessageProps } from '../types'

export default function ErrorMessage(props: LoadErrorMessageProps) {
  const containerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  }

  const primaryTextStyle = {
    color: '#eaeaea',
    fontWeight: 'bold',
    marginBottom: 0
  }

  const secondaryTextStyle = {
    color: '#bababa',
    marginBottom: 0
  }

  const errorCodeTextStyle = {
    color: '#7a7a7a',
    fontSize: 'smaller',
    marginTop: '1rem',
    marginBottom: 0
  }

  return (
    <div style={containerStyle}>
      <div>
        <p style={primaryTextStyle}>{props.message}</p>
        <p style={secondaryTextStyle}>{props.messageSecondary}</p>
        <p style={errorCodeTextStyle}>({props.code})</p>
      </div>
    </div>
  )
}
