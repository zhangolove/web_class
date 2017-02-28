import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { FormControl, Button } from 'react-bootstrap'
import { FieldGroup } from '../forms.js'
import { updateHeadline } from './followingActions'

const headline = ({headline, name, pic, update}) => {

    let input 

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input && input.value) {
            update(input.value)
            input.value = ''
        }
    }

    return (
        <div>
            <h3> {name} </h3>
            <img src={pic}  />
            <h4> {headline} </h4>
            <form onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    ref={(node)=>{input=ReactDOM.findDOMNode(node)}}
                    required
                />
                <Button type="submit">
                    Update
                </Button>
            </form>
        </div>
    )
}


const Headline = connect(
    (state) => ({
        ...state.user
    }), 
    (dispatch) => ({
        update: (text) => dispatch(updateHeadline(text))
    })
)(headline)

export default Headline