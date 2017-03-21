import {resource, ActionTypes} from '../../actions'

export const loadArticles = (articles) => ({
	type: ActionTypes.LOAD_ARTICLES,
	articles
})

export const fetchArticles = () => (dispatch) =>
	resource('GET','articles')
	.then((response) => {
        const raw = response.articles
		const articles = raw.map((article) => 
                        ({...article, date: new Date(article.date)}))
		dispatch(loadArticles(articles))
})

export const postNewArticle = (text) => (dispatch) =>
    resource('POST', 'article', {text})
    .then((response) => {
        fetchArticles()(dispatch)
    })

export const changeFilter = (filter) => ({
    type: ActionTypes.CHANGE_FILTER, filter
})
