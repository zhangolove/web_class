import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button} from 'react-bootstrap'
import Article from './article'
import {filterArticles, ArticleSearchBox} from './filterArticles'
import {FieldGroup} from '../forms'
import { postNewArticle } from './articleActions'




export const AddArticle = ({ addArticle }) => {
    let newArticle;

    const _addArticle = () => {
        if (newArticle && newArticle.value) {
            addArticle(newArticle.value)
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



export const ArticleViews = ({articles, addArticle}) => (
    <div>
        <AddArticle addArticle={addArticle} />
        <ArticleSearchBox />
        <ListGroup componentClass="ul" className="articles">
            {articles.map(({_id,text,date,img,comments,author}) => (
                <Article key={_id} id={_id} 
                    text={text} date={date} img={img} 
                    comments={comments} author={author}/>
            ))}
        </ ListGroup>
    </div>
)

ArticleViews.PropTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Article.propTypes
    }).isRequired).isRequired,
    addArticle: PropTypes.func.isRequired
}

export default connect(
    (state) => ({articles: filterArticles(state.articles, state.filter)
                    .sort((a, b) =>  b.date - a.date)}),
    (dispatch) => ({addArticle: (text)=>
                    postNewArticle(text)(dispatch)})
)(ArticleViews)
