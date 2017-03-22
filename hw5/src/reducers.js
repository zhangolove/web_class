import { Locations, ActionTypes} from './actions'
//need to convert string to date object for later sorting
const initialProfile = require('./data/profile.json').user
const Reducer = (state = {
    //these ids are useful when removing objects
    location: Locations.LANDING,
    user: initialProfile,
    followings: [],
    articles: [],
    alertType: "",
    alertContent: "",
    filter: null
}, action) => {
    switch (action.type) {
        case ActionTypes.GO_TO_PAGE:
            return { ...state, location: action.location }
        case ActionTypes.ALERT:
            return {...state, alertType: 
                action.alertType, alertContent: action.alertContent}
        case ActionTypes.LOGIN:
            return {...state, username: action.username}
        case ActionTypes.LOGOUT:
            return {...state, user: initialProfile}
        case ActionTypes.LOAD_ARTICLES:
            return {...state, articles: action.articles}
        case ActionTypes.ADD_ARTICLES:
            return {...state, articles: action.articles.concat(state.articles)}
        case ActionTypes.REMOVE_ARTICLES:
            return {...state, articles: 
                        state.articles.filter(a => a.author !== action.author)}
        case ActionTypes.LOAD_FOLLOWINGS:
            return {...state, followings: action.followingList}
        case ActionTypes.UPDATE_HEADLINE:
            return { ...state, user: { ...state.user, headline: action.text} }
        case ActionTypes.CHANGE_FILTER:
            return {...state, filter: action.filter}
        case ActionTypes.UPDATE_PROFILE:
            return {...state, user: {...state.user, ...action.changed}}
        default:
            return state
    }
}

export default Reducer