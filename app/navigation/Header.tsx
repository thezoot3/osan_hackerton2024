export default function Header() {
    return (
        <div className="absolute top-0 flex w-full items-center justify-between px-8 py-6">
            <div className={'flex items-center gap-4'}>
                <span className={'text-xl font-bold'}>L</span>
                <span className={'text-base font-semibold'}>
                    대충 서비스 이름
                </span>
            </div>
            <span className={'text-xl font-bold'}>ㅁ</span>
        </div>
    )
}
