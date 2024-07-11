export const ApiOrigin = 'https://hacker.thezoot3.com'

interface UploadResponse {
  imageID: string
}
interface GarbageResponse {
  name: string
  items: string[]
  instruct: {
    [k: string]: string[]
  }
}
