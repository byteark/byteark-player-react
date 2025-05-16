import { CSSProperties } from 'react';

import { ByteArkPlayerContainerError } from '../utils';

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
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const primaryTextStyle: CSSProperties = {
  color: '#eaeaea',
  fontWeight: 'bold',
  marginBottom: 0,
};

const secondaryTextStyle: CSSProperties = {
  color: '#bababa',
  marginBottom: 0,
};

const errorCodeTextStyle: CSSProperties = {
  color: '#7a7a7a',
  fontSize: 'smaller',
  marginTop: '1rem',
  marginBottom: 0,
};

export interface PlayerLoaderErrorMessageProps {
  error: ByteArkPlayerContainerError | null;
}

export default function PlayerLoadErrorMessage(props: PlayerLoaderErrorMessageProps) {
  const error = props.error || {
    message: 'An unknown error occurred',
    messageSecondary: 'Please refresh the page to try again.',
    code: 'ERROR_BYTEARK_PLAYER_REACT_100000',
  };

  return (
    <div style={containerStyle}>
      <div>
        <p style={primaryTextStyle}>{error.message}</p>
        <p style={secondaryTextStyle}>{error.messageSecondary}</p>
        <p style={errorCodeTextStyle}>{error.code}</p>
      </div>
    </div>
  );
}
