import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button} from 'react-bootstrap'
import { ActionTypes } from '../../actions'
import {changeFilter} from './articleActions'

const articleSearchBox = ({changeFilter}) => {
    let input
    return (
        <div>
            <FormControl
                id="inputSearchArticle"
                type="text"
                ref={(node)=>{input = ReactDOM.findDOMNode(node)}}
                placeholder="search author or text"
                onChange={() => {changeFilter(input.value)}}
            />
        </div>
    )
}

articleSearchBox.PropTypes = {
    changeFilter: PropTypes.func.isRequired
}

export const filterArticles = (articles, filter) => {
    if (!filter) {
        return articles
    }
    const query = new RegExp(filter, 'i')
    return articles.filter((a)=>query.exec(a.author) || query.exec(a.text))
}

export const ArticleSearchBox = 
    connect(null, (dispatch) => 
        ({changeFilter: (val) => dispatch(changeFilter(val))})

)(articleSearchBox)