import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Media, Button, ButtonGroup} from 'react-bootstrap'
import { connect } from 'react-redux'
import Comment from './comment'


const Article = ({text, date, img, author, comments}) => {
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
            <Media.Heading>{`${author} said on ${date}`}</Media.Heading> 
             <p>{text}</p> 
        </Media.Body>
        <ButtonGroup className="articleBtns">
            <Button>Edit Post</Button>
            <Button ref={(node)=>{commentBtn=ReactDOM.findDOMNode(node)}}
                onClick={toggleComment }>Show Comments</Button>
            <Button>Add a Comment</Button>
        </ButtonGroup>
    
        <div className='hidden' 
            ref={(node)=>{commentArea=ReactDOM.findDOMNode(node)}}>
            {comments.map((comment) => 
            <Comment key={comment.commentId} 
                     author={comment.author}
                     text={comment.text}
                     date={comment.date}/>)}
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