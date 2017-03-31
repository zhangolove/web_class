import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button, FormGroup, ControlLabel} from 'react-bootstrap'
import Article from './article'
import {filterArticles, ArticleSearchBox} from './filterArticles'
import {FieldGroup} from '../forms'
import { postNewArticle, toggleArticleEditing, toggleEditComment,
    updateArticleContent, updateComment, toggleAddComment} from './articleActions'




export const AddArticle = ({ addArticle }) => {
    let newArticle
    let newImg = null
    let fileInput = null
    const _addArticle = () => {
        if (newArticle && newArticle.value) {
            addArticle(newArticle.value, newImg)
            newArticle.value = ''
            fileInput.value = ''
        }
    }
    const _clearArticle = () => {
        newArticle.value = ''
    }

    const handleImageChange = (e) => {
        newImg = e.target.files[0]
    }

    return (<span>
        <FormControl name="inputAddArticle" componentClass="textarea" 
            placeholder="Say something...please" 
            ref={(node) => newArticle = ReactDOM.findDOMNode(node)} />
        <Button name="btnAddArticle" onClick={_addArticle}>Post</Button>
        <Button name="btnClearArticle" onClick={_clearArticle}>Clear</Button>
        <FormGroup>
        <ControlLabel>Attach a picture</ControlLabel>
        <FormControl type="file" 
                     accept="image/*" onChange={(e) => handleImageChange(e)}
                     ref={(node) => fileInput = ReactDOM.findDOMNode(node)} />
        </FormGroup>
    </span>)
}

AddArticle.PropTypes = {
    addArticle: PropTypes.func.isRequired
}



export const ArticleViews = ({articles, addArticle, 
            toggleArticleEditing, updateArticleContent, 
            toggleAddComment, updateComment, isAddingCmt,
            toggleEditComment}) => (
    <div>
        <AddArticle addArticle={addArticle} />
        <ArticleSearchBox />
        <ListGroup componentClass="ul" className="articles">
            {articles.map(({_id,text,date,img,comments,author, isEditing, isAddingCmt, ifOwned}) => {
                return (
                <Article key={_id} id={_id} 
                    text={text} date={date} img={img} 
                    comments={comments} author={author} 
                    isEditing={isEditing} isAddingCmt={isAddingCmt}
                    toggleArticleEditing={toggleArticleEditing}
                    ifOwned={ifOwned} updateComment={updateComment(_id)}
                    updateArticleContent={updateArticleContent(_id)}
                    toggleAddComment={toggleAddComment}
                    toggleEditComment={toggleEditComment(_id)}/>
            )})}
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
    (dispatch) => ({addArticle: (text, img)=>
                    postNewArticle(text, img)(dispatch),
                toggleArticleEditing: (id, author) => toggleArticleEditing(id, author, dispatch),
            updateArticleContent: (id) => updateArticleContent(id,dispatch),
            updateComment: (id) => updateComment(id, dispatch),
            toggleAddComment: (id) => toggleAddComment(id, dispatch),
            toggleEditComment: (id) => toggleEditComment(id, dispatch)})
)(ArticleViews)
