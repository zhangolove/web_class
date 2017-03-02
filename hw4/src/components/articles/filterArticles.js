import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button} from 'react-bootstrap'
import { ActionTypes } from '../../enums'

const articleSearchBox = ({changeFilter}) => {
    let input
    return (
        <div>
            <FormControl
                type="text"
                ref={(node)=>{input = ReactDOM.findDOMNode(node)}}
                placeholder="search author or text"
                onChange={() => 
                    {input && input.value && changeFilter(input.value)}}
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
    console.log(query)
    return articles.filter((a)=>query.exec(a.author) || query.exec(a.text))
}

export const ArticleSearchBox = connect(null, (dispatch) => ({
    changeFilter: (filter) => 
            dispatch({type: ActionTypes.CHANGE_FILTER, filter})
})

)(articleSearchBox)