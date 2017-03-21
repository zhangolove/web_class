import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button} from 'react-bootstrap'
import { ActionTypes } from '../../actions'
import Article from './article'
import {filterArticles, ArticleSearchBox} from './filterArticles'
import {FieldGroup} from '../forms'



const AddArticle = ({ addArticle }) => {
    let newArticle;

    const _addArticle = () => {
        if (newArticle && newArticle.value) {
            addArticle(newArticle.value, new Date(), 'me')
            newArticle.value = ''
        }
    }

    return (<span>
        <FormControl name="inputAddArticle" componentClass="textarea" 
            placeholder="Say something...please" 
            ref={(node) => newArticle = ReactDOM.findDOMNode(node)} />
        <Button name="btnAddArticle" onClick={_addArticle}>Post</Button>
        <FieldGroup id="fieldGroupPostImg" label="Attach a picture" type="file" />
    </span>)
}

AddArticle.PropTypes = {
    addArticle: PropTypes.func.isRequired
}



const articleViews = ({articles, addArticle}) => (
    <div>
        <AddArticle addArticle={addArticle} />
        <ArticleSearchBox />
        <ListGroup componentClass="ul">
            {articles.map(({_id,text,date,img,comments,author}) => (
                <Article key={_id} id={_id} 
                    text={text} date={date} img={img} 
                    comments={comments} author={author}/>
            ))}
        </ ListGroup>
    </div>
)

articleViews.PropTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Article.propTypes
    }).isRequired).isRequired,
    addArticle: PropTypes.func.isRequired
}

const ArticleViews = connect(
    (state) => ({articles: filterArticles(state.articles, state.filter)
                    .sort((a, b) =>  b.date - a.date)}),
    (dispatch) => ({addArticle: (text,date,author)=>
                    dispatch({type: ActionTypes.ADD_ARTICLE, 
                                text, date, author})})
)(articleViews)

export default ArticleViews