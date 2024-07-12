export default function ClothMapInfoWindow({ name, lat, lng }: { name: string; lat: number; lng: number }) {
  function onClick() {
    window.open('kakaomap://look?p=' + lat + ',' + lng, '_blank')
  }
  return (
    <div className={'flex flex-col text-sm'} onClick={onClick}>
      <span>{name}</span>
    </div>
  )
}
