import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button} from 'react-bootstrap'
import {ActionTypes} from '../../actions'
import MiniProfile from './miniProfile'
import {addFollowing} from './followingActions'


const AddFollowing = ({ addMember }) => {
    let newMember;

    const _addMember = () => {
        if (newMember && newMember.value) {
            addMember(newMember.value)
            newMember.value = ''
        }
    }

    return (<span>
        <FormControl name="inputAddFollowing" type="text" 
            placeholder="Add Following" ref={(node) => newMember = ReactDOM.findDOMNode(node)} />
        <Button name="btnAddFollowing" onClick={_addMember}>Add</Button>
    </span>)
}

AddFollowing.PropTypes = {
    addMember: PropTypes.func.isRequired
}




const following = ({followings, addMember}) => (
    <div>
        <h4>My Followings</h4>
        <ListGroup componentClass="ul">
            {followings.map(({id, name, headline, pic}) => (
                <MiniProfile key={id} id={id} 
                    name={name} headline={headline} pic={pic}/>
            ))}
        </ ListGroup>
        <AddFollowing addMember={addMember} />
    </div>
)

following.PropTypes = {
    followings: PropTypes.arrayOf(PropTypes.shape({
                ...MiniProfile.propTypes
            }).isRequired).isRequired,
    addMember: PropTypes.func.isRequired
}

const Following = connect(
    (state) => ({followings: state.followings}),
    (dispatch) => ({addMember: (name)=>
                    addFollowing(name)(dispatch)})
)(following)

export default Following