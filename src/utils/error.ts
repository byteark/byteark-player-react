export class ByteArkPlayerContainerError extends Error {
  code: string;
  originalError: unknown;
  messageSecondary: string;

  constructor(name: string, code: string, message: string, originalError: unknown, messageSecondary?: string) {
    super(message);

    this.name = name;
    this.code = code;
    this.originalError = originalError;
    this.messageSecondary = messageSecondary || 'Please refresh the page to try again.';
  }
}

export class LoadPlayerResourceError extends ByteArkPlayerContainerError {
  constructor(message: string, originalError: unknown, messageSecondary?: string) {
    super('LoadPlayerResourceError', 'ERROR_BYTEARK_PLAYER_REACT_100001', message, originalError, messageSecondary);
  }
}

export class SetupPlayerOptionsError extends ByteArkPlayerContainerError {
  constructor(message: string, originalError: unknown, messageSecondary?: string) {
    super('SetupPlayerOptionsError', 'ERROR_BYTEARK_PLAYER_REACT_100002', message, originalError, messageSecondary);
  }
}

export class SetupPlayerError extends ByteArkPlayerContainerError {
  constructor(message: string, originalError: unknown, messageSecondary?: string) {
    super('SetupPlayerError', 'ERROR_BYTEARK_PLAYER_REACT_100003', message, originalError, messageSecondary);
  }
}

export class CreatePlayerError extends ByteArkPlayerContainerError {
  constructor(message: string, originalError: unknown, messageSecondary?: string) {
    super('CreatePlayerError', 'ERROR_BYTEARK_PLAYER_REACT_100004', message, originalError, messageSecondary);
  }
}
