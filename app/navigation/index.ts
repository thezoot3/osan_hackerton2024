export enum HomeNavigationPath {
    HOME_ROOT = '/home',
}
export enum ServiceNavigationPath {
    SERVICE_INSPECT = '/service/inspect',
    SERVICE_MAP = '/service/map',
    SERVICE_SETTING = '/service/setting',
    SERVICE_HISTORY = '/service/history',
}
export const ServiceNavigationDisplay: { [p: string]: string } = {
    [ServiceNavigationPath.SERVICE_INSPECT]: '검사',
    [ServiceNavigationPath.SERVICE_MAP]: '지도',
    [ServiceNavigationPath.SERVICE_SETTING]: '설정 및 정보',
    [ServiceNavigationPath.SERVICE_HISTORY]: '기록',
}
