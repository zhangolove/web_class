import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Media, Button, ButtonGroup} from 'react-bootstrap'
import { connect } from 'react-redux'
import Comment from './comment'
import EditableContent from './editableContent'




const Article = ({id, text, date, img, author, 
                comments, isEditing, toggleArticleEditing,
                toggleAddComment, toggleEditComment, isAddingCmt,
                 updateArticleContent, ifOwned, updateComment}) => {
    let commentBtn, commentArea
    let showComment = false

    const toggleComment = () => {
        showComment = !showComment
        commentBtn.innerHTML = showComment ? "Hide Comment" : "Show Comment"
        commentArea.className = showComment ? '': 'hidden'
    }

    const toggleEditable = () => {
        toggleArticleEditing(id, author)
    }

    const _toggleAddComment = () => {
        toggleAddComment(id)
    }

    return (<li className="list-group-item article">
        <Media>
        <Media.Left align="top">
            <img width={64} height={64} src={img} alt="No Image"/>
        </Media.Left>
        <Media.Body className="articleMain">
            <Media.Heading>{`${author} said on ${date}`}</Media.Heading> 
            <EditableContent text={text} editable={isEditing} 
                        update={updateArticleContent}/>
        </Media.Body>
        <ButtonGroup className="articleBtns">
            { ifOwned ? <Button onClick={toggleEditable}>Edit Post</Button> :
                        <Button disabled>Edit Post</Button>}
            <Button ref={(node)=>{commentBtn=ReactDOM.findDOMNode(node)}}
                onClick={toggleComment }>Show Comments</Button>
            <Button onClick={_toggleAddComment}>{isAddingCmt ? 
                               "Cancel" : "Add a Comment" }</Button>
        </ButtonGroup>
        {isAddingCmt ? 
            <EditableContent text="" editable={true} 
                update={updateComment(-1)}/>: ""}
        <div className='hidden' 
            ref={(node)=>{commentArea=ReactDOM.findDOMNode(node)}}>
            {comments.map((comment) => 
            <Comment key={comment.commentId} 
                     author={comment.author}
                     text={comment.text}
                     date={comment.date}
                     ifOwned={comment.ifOwned}
                     isEditing={comment.isEditing}
                     update={updateComment(comment.commentId)}
                     toggleEditComment={toggleEditComment(comment.commentId)}/>)}
        </div>
        
        </Media> 
    </li>)
}

Article.PropTypes = {
    text: React.PropTypes.string.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired,
    img: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
}
export default Article