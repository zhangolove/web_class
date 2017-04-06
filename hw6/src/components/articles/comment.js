import React from 'react'
import {Media, Button} from 'react-bootstrap'
import EditableContent from './editableContent'
import { connect } from 'react-redux'
import {toggleEditComment, updateComment} from './articleActions'

export const Comment = ({id, commentId, author, date, text, 
                toggleEditComment, updateComment, isEditing, ifOwned}) => {

	return (<Media>
        <Media.Body className="comment">
            <Media.Heading>{`${author} commented on ${date}`}</Media.Heading> 
             <EditableContent text={text} 
                update={updateComment(id, commentId)} editable={isEditing} />
             { ifOwned ? 
             <Button onClick={toggleEditComment(id, commentId)}>
                     Edit Comment
            </Button> :
           <Button disabled>Edit Comment</Button>}
        </Media.Body>
	</Media>)
	
}

export default connect(
    (_)=>_,
    (dispatch) => ({
            updateComment: updateComment(dispatch),
            toggleEditComment: toggleEditComment(dispatch)
            })
)(Comment)