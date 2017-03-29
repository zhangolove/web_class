import {resource, ActionTypes} from '../../actions'

export const loadArticles = (raw) => ({
	type: ActionTypes.LOAD_ARTICLES,
	articles: raw.map((article) => 
                        ({...article, date: new Date(article.date)}))
})

export const fetchArticles = () => (dispatch) =>
	resource('GET','articles')
	.then((response) => {
		dispatch(loadArticles(response.articles))
})

export const postNewArticle = (text) => (dispatch) =>
    resource('POST', 'article', {text})
    .then((response) => {
        fetchArticles()(dispatch)
    })

export const changeFilter = (filter) => ({
    type: ActionTypes.CHANGE_FILTER, filter
})
