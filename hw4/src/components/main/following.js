import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {FormControl, ListGroup, Button} from 'react-bootstrap'
import { ActionTypes } from '../../enums'
import MiniProfile from './miniProfile'


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




const following = ({followings, addMember}) => (
    <div>
        <ListGroup componentClass="ul">
            {followings.map(({id, name, headline, pic}) => (
                <MiniProfile key={id} id={id} 
                    name={name} headline={headline} pic={pic}/>
            ))}
        </ ListGroup>
        <AddFollowing addMember={addMember} />
    </div>
)

const Following = connect(
    (state) => ({followings: state.followings}),
    (dispatch) => ({addMember: (name)=>
                    dispatch({type: ActionTypes.ADD_FOLLOWING, name})})
)(following)

export default Following