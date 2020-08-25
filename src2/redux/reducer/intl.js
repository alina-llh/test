import { SET_INTL } from '../constants/intl'
const initIntl = window.navigator.language === 'en' ? 'en' : 'zh'
export default function intl (prevState = initIntl, actions) {
  switch (actions.type) {
    case SET_INTL:
      return actions.data;

    default:
      return prevState;
  }
}