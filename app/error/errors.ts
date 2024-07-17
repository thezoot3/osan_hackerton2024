import { ErrorPage } from '@/app/error/[errorID]/error'
import { NoPhotography, Block } from '@mui/icons-material'

const Errors: { [p: string]: ErrorPage } = {
  inspectImageNotFound: {
    title: '이미지가 제대로 촬영되지 않았습니다.',
    icon: NoPhotography,
    subtitle: ['촬영 페이지로 돌아가 다시 촬영을 시도해 보십시오', '카메라 허용 권한을 확인해 보십시오.'],
    backSrc: '/service/inspect',
  },
  anyError: {
    title: '무엇인가 문제가 생겼습니다.',
    icon: Block,
    subtitle: ['관리자에게 오류 사실을 알려주십시오'],
    backSrc: '/',
  },
}

export default Errors
