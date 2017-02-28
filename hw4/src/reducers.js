import * as Actions from './actions'
import {Locations, ActionTypes} from './enums'

const Reducer = (state = {
    location: Locations.MAIN,
    user: {
        name: 'Chongzhang',
        pic: 'http://cvcl.mit.edu/hybrid/MonroeEnstein_AudeOliva2007.jpg',
        headline: 'default headline'
    }
}, action) => {
    switch (action.type) {
        case ActionTypes.GO_TO_PAGE:
            return { ...state, location: action.location }
        case ActionTypes.UPDATE_HEADLINE:
            return { ...state, user: { ...state.user, headline: action.text} }
        default:
            return state
    }
}

export default Reducer