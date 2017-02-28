import * as Actions from './actions'
import {Locations, ActionTypes} from './enums'
const initialFollowers = require('./data/followers.json').followers

const Reducer = (state = {
    nextId: 3,
    location: Locations.MAIN,
    user: {
        name: 'Chongzhang',
        pic: 'http://cvcl.mit.edu/hybrid/MonroeEnstein_AudeOliva2007.jpg',
        headline: 'default headline'
    },
    followers: initialFollowers
}, action) => {
    switch (action.type) {
        case ActionTypes.GO_TO_PAGE:
            return { ...state, location: action.location }
        case ActionTypes.UPDATE_HEADLINE:
            return { ...state, user: { ...state.user, headline: action.text} }
        case ActionTypes.REMOVE_FOLLOWER:
            return { ...state,
                followers: state.followers.filter(({id}) => id != action.id) }
        case ActionTypes.ADD_FOLLOWER:
            return { ...state, nextId: state.nextId + 1,
                    followers: [...state.followers,
                        { id: state.nextId, 
                        name: action.name, 
                        headline:`I am Person ${state.nextId}`,
                        pic: "https://unsplash.it/200/300?random"
                        }
                    ]
                 }
        default:
            return state
    }
}

export default Reducer