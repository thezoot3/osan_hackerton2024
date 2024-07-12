export const ApiOrigin = 'https://api.thezoot3.com'

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
