import { Locations, ActionTypes} from './actions'

const addOwnership = (articles, self) => 
    articles.map((a) => ({...a, 
        ifOwned: a.author === self,
        comments: a.comments.map((c) => ({...c, ifOwned: c.author === self}))}))

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
            return { ...state, location: action.location,
                    alertType:"", alertContent:"" }
        case ActionTypes.ALERT:
            return {...state, alertType: 
                action.alertType, alertContent: action.alertContent}
        case ActionTypes.DISMISS_ALERT:
            return {...state, alertType:"", alertContent:""}
        case ActionTypes.LOGIN:
            return {...state, user: {...state.user, username: action.username}}
        case ActionTypes.LOGOUT:
            return {...state, user: {}}
        case ActionTypes.LOAD_ARTICLES:
            return {...state, 
                articles: addOwnership(action.articles, state.user.username)}
        case ActionTypes.ADD_ARTICLES:
            return {...state, 
                articles: addOwnership(action.articles, state.user.username)
                            .concat(state.articles)}
        case ActionTypes.REMOVE_ARTICLES:
            return {...state, articles: 
                        state.articles.filter((a) => 
                            a.author !== action.author)}
        case ActionTypes.LOAD_FOLLOWINGS:
            return {...state, followings: action.followingList}
        case ActionTypes.UPDATE_HEADLINE:
            return { ...state, user: { ...state.user, headline: action.text} }
        case ActionTypes.CHANGE_FILTER:
            return {...state, filter: action.filter}
        case ActionTypes.UPDATE_PROFILE:
            return {...state, user: {...state.user, ...action.field}}
        case ActionTypes.EDIT_ARTICLE:
            return {...state, articles: 
                        state.articles.map((a) => {
                return a._id === action.id ?
                    {...a, isEditing:!a.isEditing} : a 
            })}
        case ActionTypes.EDIT_COMMENT:
            return {...state, articles: 
                        state.articles.map((a) => {
                return a._id === action.id ?
                    {...a, comments: a.comments.map((c) => {
                        return c.commentId === action.commentId ?
                            {...c, isEditing: !c.isEditing} : c
                    })} : a 
            })}
        case ActionTypes.ADD_COMMENT:
            return {...state, articles: 
                        state.articles.map((a) => {
                return a._id === action.id ?
                    {...a, isAddingCmt:!a.isAddingCmt} : a 
            })}
        case ActionTypes.SHOW_COMMENT:
            return {...state, articles: 
                        state.articles.map((a) => {
                return a._id === action.id ?
                    {...a, ifShowComments:!a.ifShowComments} : a 
            })}
        default:
            return state
    }
}

export default Reducer