import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { FormControl, Button, Image } from 'react-bootstrap'
import {ActionTypes} from '../../actions'
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
            <Image src={pic} rounded responsive/>
            <h4> {headline} </h4>
            <form onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    ref={(node)=>{input=ReactDOM.findDOMNode(node)}}
                    placeholder="Update headline"
                    required
                />
                <Button type="submit">
                    Update
                </Button>
            </form>
        </div>
    )
}

headline.PropTypes = {
    headline: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pic: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired
}

const Headline = connect(
    (state) => ({
        ...state.user
    }), 
    (dispatch) => ({
        update: (text) => dispatch(
            {type: ActionTypes.UPDATE_HEADLINE,text})
    })
)(headline)

export default Headline