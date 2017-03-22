import React from 'react'
import {Media} from 'react-bootstrap'


const Comment = ({author, date, text}) => 
	(
	<Media>
        <Media.Body className="comment">
            <Media.Heading>{`${author} commented on ${date}`}</Media.Heading> 
             <p>{text}</p> 
        </Media.Body>
	</Media>
	)


export default Comment