import { Locations, ActionTypes} from './actions'
const Reducer = (state = {
    location: Locations.LANDING,
    user: {},
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
            return {...state, user: {...state.user, username: action.username}}
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
            return {...state, user: {...state.user, ...action.field}}
        default:
            return state
    }
}

export default Reducer