import { INLI } from '../constants/intl'
const initIntl = 'zh'
export default function intl (prevIntl = initIntl, actions) {
  switch (actions.type) {
    case INLI:
      return actions.data
    default:
      return prevIntl
  }
}