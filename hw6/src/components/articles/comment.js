import React from 'react'
import {Media, Button} from 'react-bootstrap'
import EditableContent from './editableContent'

const Comment = ({author, date, text, toggleEditComment, update, isEditing, ifOwned}) => {

	return (<Media>
        <Media.Body className="comment">
            <Media.Heading>{`${author} commented on ${date}`}</Media.Heading> 
             <EditableContent text={text} update={update} editable={isEditing} />
             { ifOwned ? <Button onClick={toggleEditComment}>Edit Comment</Button> :
                        <Button disabled>Edit Comment</Button>}
        </Media.Body>
	</Media>)
	
}

export default Comment