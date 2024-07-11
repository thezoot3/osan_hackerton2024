export const ApiOrigin = 'https://hacker.thezoot3.com'

export interface UploadResponse {
  imageID: string
}
export interface GarbageResponse {
  name: string
  items: string[]
  instruct: {
    [k: string]: string[]
  }
}
