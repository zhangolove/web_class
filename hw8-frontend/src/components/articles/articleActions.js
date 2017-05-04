import {resource, ActionTypes} from '../../actions'

export const loadArticles = (raw) => ({
	type: ActionTypes.LOAD_ARTICLES,
	articles: raw.map((article) => 
                        ({...article, date: new Date(article.date),
                        isEditing: false}))
})

export const fetchArticles = () => (dispatch) =>
	resource('GET','articles')
	.then((response) => {
		dispatch(loadArticles(response.articles))
})

const _postNewArticle = (fd, dispatch) => 
    resource('POST', 'article', fd, true)
    .then((response) => {
        fetchArticles()(dispatch)
    })

export const postNewArticleWithImg = (text, img) => (dispatch) => {
    const fd = new FormData()
    fd.append('text', text)
    if (img) {
        fd.append('image', img)
    }
    return _postNewArticle(fd, dispatch)
}

export const postNewArticle = (text) => (dispatch) => 
    resource('POST', 'article', {text})
    .then((response) => {
        fetchArticles()(dispatch)
    })


export const toggleArticleEditing = (id, dispatch) => 
    dispatch({type: ActionTypes.EDIT_ARTICLE, id})

export const toggleAddComment = (id, dispatch) =>
    dispatch({type: ActionTypes.ADD_COMMENT, id})

export const toggleEditComment = (dispatch) => (id, commentId) => () =>
    dispatch({type: ActionTypes.EDIT_COMMENT, id, commentId})

export const toggleShowComment = (id, dispatch) => 
    dispatch({type: ActionTypes.SHOW_COMMENT, id})

export const changeFilter = (filter) => ({
    type: ActionTypes.CHANGE_FILTER, filter
})

export const updateArticleContent = (dispatch) => (id) => (text) => 
    resource('PUT', `articles/${id}`, {text})
    .then((response) => {
        fetchArticles()(dispatch)
    })

export const updateComment = (dispatch) => (id, commentId) => (text) => 
    resource('PUT', `articles/${id}`, {text, commentId})
    .then((response) => {
        fetchArticles()(dispatch)
    })

