import { Locations, ActionTypes} from './actions'
const initialFollowing = require('./data/followings.json').followings
//need to convert string to date object for later sorting
const initialProfile = require('./data/profile.json').user
const initialNumArticles = 0
const initialNumFollowings = initialFollowing.length

const Reducer = (state = {
    //these ids are useful when removing objects
    nextFollowingId: initialNumFollowings,
    nextArticleId: initialNumArticles,
    location: Locations.LANDING,
    user: initialProfile,
    followings: initialFollowing,
    articles: [],
    alertType: "",
    alertContent: "",
    filter: null
}, action) => {
    switch (action.type) {
        case ActionTypes.GO_TO_PAGE:
            return { ...state, location: action.location }
        case ActionTypes.ALERT:
            return {...state, alertType: action.alertType, alertContent: action.alertContent}
        case ActionTypes.LOGIN:
            return {...state, username: action.username}
        case ActionTypes.LOGOUT:
            return {...state, user: initialProfile}
        case ActionTypes.LOAD_ARTICLES:
            return {...state, articles: action.articles}
        case ActionTypes.UPDATE_HEADLINE:
            return { ...state, user: { ...state.user, headline: action.text} }
        case ActionTypes.REMOVE_FOLLOWING:
            return { ...state,
                followings: state.followings.filter(({id}) => id != action.id) }
        case ActionTypes.ADD_FOLLOWING:
            //currently headline and pic are hardcoded
            return { ...state, nextFollowingId: state.nextFollowingId + 1,
                    followings: [...state.followings,
                        { id: state.nextFollowingId, 
                        name: action.name, 
                        headline:`I am Person ${state.nextFollowingId}`,
                        pic: "https://unsplash.it/200/300?random"
                        }
                    ]
                 }
        case ActionTypes.ADD_ARTICLE:
            return { ...state, nextArticleId: state.nextArticleId + 1,
                    articles: [...state.articles,
                        { _id: state.nextArticleId, 
                          text: action.text,
                          date: action.date,
                          author: action.author,
                          img: null,
                          comments: []
                        }
                    ]
            }
        case ActionTypes.CHANGE_FILTER:
            return {...state, filter: action.filter}
        case ActionTypes.UPDATE_PROFILE:
            return {...state, user: {...state.user, ...action.changed}}
        default:
            return state
    }
}

export default Reducer