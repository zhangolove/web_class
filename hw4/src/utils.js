import {goToPage} from './actions'

export const toLink = (text, dest, dispatch) => ({
    text,
    action: () => dispatch(goToPage(dest))
})