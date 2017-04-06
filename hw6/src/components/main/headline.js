import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { FormControl, Button, Image } from 'react-bootstrap'
import {ActionTypes} from '../../actions'
import {updateHeadline} from '../profile/profileActions'
const headline = ({headline, username, avatars, update}) => {

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
            <h3> {username} </h3>
            <Image src={!avatars ? '' : avatars[0].avatar} rounded responsive/>
            <h4 id="hHead"> {headline} </h4>
            <form onSubmit={handleSubmit}>
                <FormControl
                    type="text"
                    id="inputHeadline"
                    ref={(node)=>{input=ReactDOM.findDOMNode(node)}}
                    placeholder="Update headline"
                    required
                />
                <Button id="btnHeadline" type="submit">
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
        update: (text) => updateHeadline(text)((fn) => fn(dispatch))})
)(headline)

export default Headline