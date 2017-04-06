import { resource, ActionTypes, alertError } from '../../actions'


const loadFollowingInfo = (dispatch) => (response) => {
        //if you have no followings, do not need to do anything
        if (response.following.length === 0) {
            dispatch({ type: ActionTypes.LOAD_FOLLOWINGS, followingList:[] })
            return
        }
        const following = response.following.reduce((aggr, name)=> {
            aggr[name] = {name}
            return aggr
        }, {})
        const query = response.following.join(',')
        return Promise.all([getFollowingHeadings(query, following), 
                            getFollowingAvatars(query, following)])
            .then(() => {
                const followingList = Object.keys(following)
                                            .map((key, idx) => ({
                        id: idx, 
                        name: following[key].name,
                        headline: following[key].headline,
                        pic: following[key].avatar
                }))
                dispatch({ type: ActionTypes.LOAD_FOLLOWINGS, followingList })
                return following
            })
    }

const fetchArticle = (dispatch, author) => 
    resource('GET', `articles/${author}`)
			.then((response) => {
			dispatch({type: ActionTypes.ADD_ARTICLES,
	                articles: response.articles.map((article) => 
                        ({...article, date: new Date(article.date)}))})
	    })

const checkExistence = (dispatch, callback, name) => 
    resource('GET', `following/${name}`)
			.then(callback)
            .catch((err) => 
			    dispatch(alertError(
                    `Add following error: ${name} that does not exist`)))


export const fetchFollowings = () => (dispatch) => 
{   
    resource('GET', 'following/')
    .then(loadFollowingInfo(dispatch))
    .catch((err) => {
        dispatch(alertError('Unable to fetch following list.'))
    })
}

const _addFollowing = (dispatch, name) => () =>
    fetchArticle(dispatch, name)
        .then(() => resource('PUT', `following/${name}`)
                .then(loadFollowingInfo(dispatch)))
        .catch((err) => {
            dispatch(alertError('Errors occurs when adding following.'))
        })

const _removeFollowing = (dispatch, name) => () =>
    resource('DELETE', `following/${name}`)
        .then(loadFollowingInfo(dispatch))
        .then(() => dispatch({type:ActionTypes.REMOVE_ARTICLES, author: name}))
        .catch((err) => 
            dispatch(alertError('Errors occurs when removing following.'))
        )

const validateNewFollowing = (newName, myname, followings) => {
    //you cannot add yourself or existing followings
    if (newName === myname) return false
    return followings.filter(({name}) => name === newName).length === 0
}

export const addFollowing = (name, myname, followings) => (dispatch) =>  {
    if (validateNewFollowing(name, myname, followings)) {
        checkExistence(dispatch, _addFollowing(dispatch, name), name)
    } else {
        dispatch(alertError('Cannot add repeated following or yourself'))
    }
}

export const removeFollowing = (name) => (dispatch) =>  
    checkExistence(dispatch, _removeFollowing(dispatch, name), name)
        
const getFollowingHeadings = (query, following) => 
    resource('GET', `headlines/${query}`)
        .then((response) => {
			response.headlines.forEach((item) => {
                following[item.username].headline = item.headline
            })
            return following
		})

const getFollowingAvatars = (query, following) => 
    resource('GET', `avatars/${query}`)
        .then((response) => {
			response.avatars.forEach((item) => {
                following[item.username].avatar = item.avatar
            })
            return following
		})

const getFollowingArticles = (following, dispatch) => 
    Promise.all(Object.keys(following).map((k) => fetchArticle(dispatch, k)))