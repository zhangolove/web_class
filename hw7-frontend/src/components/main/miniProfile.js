import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Media, Button, Glyphicon, ListGroupItem} from 'react-bootstrap'
import { connect } from 'react-redux'
import { ActionTypes } from '../../actions'
import { removeFollowing } from './followingActions'


const miniProfile = ({name, pic, headline, remove}) => (
    <ListGroupItem>
        <Media>
        <Media.Left align="top">
            <img width={64} height={64} src={pic} alt="Image"/>
        </Media.Left>
        <Media.Body>
            <Media.Heading className="hFollowing">{name}</Media.Heading> 
            <p> {headline} </p>
            <Button className="btnRemoveFollowing" onClick={remove}>
                <Glyphicon glyph="remove" />
            </Button>
        </Media.Body>
        </Media>
    </ListGroupItem>
)


const MiniProfile = connect(null, (dispatch, ownProps) => ({
        remove: () => removeFollowing(ownProps.name)(dispatch),
    })
)(miniProfile)

MiniProfile.PropTypes = {
    name: React.PropTypes.string.isRequired,
    pic: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string.isRequired,
    remove: React.PropTypes.func.isRequired
}

export default MiniProfile