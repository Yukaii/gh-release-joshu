// decode base64 encode with base64 -b 0 <file>
export function decodeBase64(str: string) {
  return Buffer.from(str, 'base64').toString('ascii')
}
