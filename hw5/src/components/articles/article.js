import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Media, Button, ButtonGroup} from 'react-bootstrap'
import { connect } from 'react-redux'


const Article = ({text, date, img, author}) => (
    <li className="list-group-item article">
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
            <Button>Show Comments</Button>
            <Button>Add a Comment</Button>
        </ButtonGroup>
        </Media>
    </li>
)

Article.PropTypes = {
    text: React.PropTypes.string.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired,
    img: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
}
export default Article