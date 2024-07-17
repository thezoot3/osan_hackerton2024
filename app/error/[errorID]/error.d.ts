import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface ErrorPage {
  title: string
  icon: OverridableComponent<any> | undefined
  subtitle: Array<string> | undefined
  backSrc: string
}
