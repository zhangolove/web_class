import * as Actions from './actions'
import {Locations, ActionTypes} from './enums'

const initialFollowing = require('./data/followings.json').followings
const rawArticles = require('./data/articles.json').articles
const initialArticles = rawArticles.map((article) => ({...article, date: new Date(article.date)}))
const initialProfile = require('./data/profile.json').user
const initialNumArticles = initialArticles.length
const initialNumFollowings = initialFollowing.length

const Reducer = (state = {
    nextId: initialNumFollowings,
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
            return { ...state, nextId: state.nextId + 1,
                    followings: [...state.followings,
                        { id: state.nextId, 
                        name: action.name, 
                        headline:`I am Person ${state.nextId}`,
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
            return {...state, user: {...state.user, ...action.fields}}
        default:
            return state
    }
}

export default Reducer