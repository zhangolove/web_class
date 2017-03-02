import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Media, Button, Glyphicon} from 'react-bootstrap'
import { connect } from 'react-redux'
import { ActionTypes } from '../../enums'


const miniProfile = ({name, pic, headline, remove}) => (
    <li className="list-group-item">
        <Media>
        <Media.Left align="top">
            <img width={64} height={64} src={pic} alt="Image"/>
        </Media.Left>
        <Media.Body>
            <Media.Heading>{name}</Media.Heading> 
            <p> {headline} </p>
            <Button><Glyphicon glyph="remove" onClick={remove}/></Button>
        </Media.Body>
        </Media>
    </li>
)


const MiniProfile = connect(null, (dispatch, ownProps) => ({
        remove: () => dispatch({ type: ActionTypes.REMOVE_FOLLOWING, 
                                id: ownProps.id }),
    })
)(miniProfile)

MiniProfile.PropTypes = {
    name: React.PropTypes.string.isRequired,
    pic: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string.isRequired,
    remove: React.PropTypes.func.isRequired
}

export default MiniProfile