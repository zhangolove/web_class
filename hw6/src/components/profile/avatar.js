import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import {FieldGroup} from '../forms'



const avatar = ({avatars}) => (
    <div>
        <Image src={!avatars ? '' : avatars[0].avatar} rounded responsive/>
        <FieldGroup id="fieldGroupAvartar" 
                label="Upload new profile avatar" type="file" />
    </div>
)

avatar.PropTypes = {
    pic: PropTypes.string.isRequired,
}

const Avatar = connect(
    (state) => ({...state.user}),
    null
)(avatar)

export default Avatar