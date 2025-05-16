export function checkIfCanUseDOM(): boolean {
  return typeof window !== 'undefined' && window.document && window.document.createElement !== undefined;
}
