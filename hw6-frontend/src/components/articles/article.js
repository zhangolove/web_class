import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Media, Button, ButtonGroup} from 'react-bootstrap'
import { connect } from 'react-redux'
import Comment from './comment'
import EditableContent from './editableContent'
import {toggleAddComment, toggleArticleEditing, 
    toggleEditComment, updateArticleContent, 
    updateComment, toggleShowComment} from './articleActions'



export const Article = ({id, text, date, img, author, toggleShowComment,
                comments, isEditing, ifShowComments, toggleArticleEditing,
                toggleAddComment, 
                isAddingCmt, updateArticleContent, ifOwned, updateComment}) =>{
    let commentBtn, commentArea
    let showComment = false

    const toggleComment = () => {
        showComment = !showComment
        commentBtn.innerHTML = showComment ? "Hide Comment" : "Show Comment"
        commentArea.className = showComment ? '': 'hidden'
    }


    return (<li className="list-group-item article">
        <Media>
        <Media.Left align="top">
            <img width={64} height={64} src={img} alt="No Image"/>
        </Media.Left>
        <Media.Body className="articleMain">
            <Media.Heading className="articleAuthor">
                {`${author} said on ${date}`}
            </Media.Heading> 
            <EditableContent className="t_articleContent"
                         text={text} editable={isEditing} 
                        update={updateArticleContent(id)}/>
        </Media.Body>
        <ButtonGroup className="articleBtns">
            { ifOwned ? 
            <Button className="btnToggleEdit" 
                    onClick={toggleArticleEditing(id)}>
                Edit Post
            </Button> :
            <Button disabled>Edit Post</Button>}
            <Button ref={(node)=>{commentBtn=ReactDOM.findDOMNode(node)}}
                onClick={toggleShowComment(id)}>
                {ifShowComments ? "Hide Comments" : "Show Comments"}
            </Button>
            <Button onClick={toggleAddComment(id)}>{isAddingCmt ? 
                               "Cancel" : "Add a Comment" }</Button>
        </ButtonGroup>
        {isAddingCmt ? 
            <EditableContent text="" editable={true} 
                update={updateComment(id, -1)}/>: ""}
        {ifShowComments ? 
        <div
            ref={(node)=>{commentArea=ReactDOM.findDOMNode(node)}}>
            {comments.map((comment) => 
            <Comment key={comment.commentId} 
                     author={comment.author}
                     text={comment.text}
                     date={comment.date}
                     ifOwned={comment.ifOwned}
                     isEditing={comment.isEditing}
                     id={id}
                     commentId={comment.commentId}/>)}
        </div> : ""

        }
        
        </Media> 
    </li>)
}

Article.PropTypes = {
    text: React.PropTypes.string.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired,
    img: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
}


export default connect(
    (_)=>_,
    (dispatch) => ({
            toggleAddComment: (id) => () => toggleAddComment(id, dispatch),
            toggleArticleEditing: (id) => () => 
                                toggleArticleEditing(id, dispatch),
            updateArticleContent: updateArticleContent(dispatch),
            updateComment: updateComment(dispatch),
            toggleShowComment: (id) => () => toggleShowComment(id, dispatch)
            })
)(Article)