import * as Actions from './actions'
import {Locations, ActionTypes} from './enums'

const initialFollowers = require('./data/followers.json').followers
const initialArticles = require('./data/articles.json').articles
const initialNumArticles = initialArticles.length

const Reducer = (state = {
    nextId: 3,
    nextArticleId: initialNumArticles,
    location: Locations.MAIN,
    user: {
        name: 'Chongzhang',
        pic: 'http://cvcl.mit.edu/hybrid/MonroeEnstein_AudeOliva2007.jpg',
        headline: 'default headline'
    },
    followers: initialFollowers,
    articles: initialArticles,
    filter: null
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
        case ActionTypes.ADD_ARTICLE:
            return { ...state, nextId: state.nextArticleId + 1,
                    articles: [...state.articles,
                        { _id: state.nextId, 
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
        default:
            return state
    }
}

export default Reducer