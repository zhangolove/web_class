import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import {FieldGroup} from '../forms'



const avatar = ({pic}) => (
    <div>
        <Image src={pic} rounded responsive/>
        <FieldGroup id="fieldGroupAvartar" label="Upload new profile avatar" type="file" />
    </div>
)

const Avatar = connect(
    (state) => ({...state.user}),
    null
)(avatar)

export default Avatar