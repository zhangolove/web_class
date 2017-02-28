import * as Actions from './actions'
import {Locations, ActionTypes} from './enums'

const Reducer = (state = {
    location: Locations.MAIN
}, action) => {
    switch (action.type) {
        case ActionTypes.GO_TO_PAGE:
            console.log("reducer GO_TO_PAGE")
            return { ...state, location: action.location }
        default:
            return state
    }
}

export default Reducer