import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import { IArgs } from 'simple-notify/dist/types'

export const useToast = (toastParameters: IArgs) => {
  const isDark = useDark()
  const LIGHT_TYPE = 1
  const DARK_TYPE = 2
  const notify = new Notify({
    ...toastParameters,
    type: isDark ? DARK_TYPE : LIGHT_TYPE,
  })
  return notify
}