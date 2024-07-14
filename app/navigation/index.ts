export enum HomeNavigationPath {
  HOME_ROOT = '/',
}
export enum ServiceNavigationPath {
  SERVICE_INSPECT = '/service/inspect',
  SERVICE_MAP = '/service/map',
}
export const ServiceNavigationDisplay: { [p: string]: string } = {
  [ServiceNavigationPath.SERVICE_INSPECT]: '검사',
  [ServiceNavigationPath.SERVICE_MAP]: '지도',
}
