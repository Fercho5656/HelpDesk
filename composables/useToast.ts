import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import { IArgs } from 'simple-notify/dist/types'

export const useToast = (toastParameters: IArgs) => {
  const notify = new Notify({
    ...toastParameters
  })
  return notify
}