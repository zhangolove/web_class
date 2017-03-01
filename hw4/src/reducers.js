import {Locations, ActionTypes} from './enums'

const initialFollowing = require('./data/followings.json').followings
const rawArticles = require('./data/articles.json').articles
//need to convert string to date object for later sorting
const initialArticles = rawArticles.map((article) => ({...article, date: new Date(article.date)}))
const initialProfile = require('./data/profile.json').user
const initialNumArticles = initialArticles.length
const initialNumFollowings = initialFollowing.length

const Reducer = (state = {
    //these ids are useful when removing objects
    nextFollowingId: initialNumFollowings,
    nextArticleId: initialNumArticles,
    location: Locations.MAIN,
    user: initialProfile,
    followings: initialFollowing,
    articles: initialArticles,
    filter: null
}, action) => {
    switch (action.type) {
        case ActionTypes.GO_TO_PAGE:
            return { ...state, location: action.location }
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