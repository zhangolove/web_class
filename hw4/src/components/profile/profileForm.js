import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { validate_pwd } from '../forms.js'
import {ActionTypes} from '../../enums'



const profileForm = ({name, dob, email, phone, zipcode, pwd, update}) => {
    const refs = {}
    const onChange = (e) => {e.target.setCustomValidity('')}
    const props = [
        {id: "name", type: "text", label: "Display Name", placeholder: name},
        {id: "email", type: "email", label: "Email address", placeholder: email,
            pattern:"^[A-Za-z0-9]+@[A-Za-z0-9.]+\\.[a-zA-Z]+$"},
        {id: "dob", type: "text",label:"Date of Birth",placeholder: dob, readOnly: true},
        {id: "phone", type: "tel", label: "Phone", placeholder: phone, pattern: "^\\d{10}$"},
        {id: "zipcode", type: "text", label: "Zipcode", placeholder: zipcode, pattern: "^\\d{5}$"},
        {id: "pwd", type: "password", label: "Password"},
        {id: "pwd1", type: "password", label: "Confirm Password", onChange}
    ]
    
    const _update = (e) => {
        e.preventDefault();
        update(refs)
    }

    return (
    <form onSubmit={_update}>
        {
            props.map(({label,id, ...props}, idx) => (
                <FormGroup key={idx}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} 
                        ref={(node)=>{refs[id]=ReactDOM.findDOMNode(node)}}/>
                </FormGroup>
            ))
        }
        <Button type="submit">
            Update Profile
        </Button>
    </form>
)}


const ProfileForm = connect(
    (state) => ({...state.user}),
    (dispatch) => ({
        update: (refs) => {
            const {pwd, pwd1} = refs
            //pwd1 is only for confirmation, so don't want it to be updated
            const changed = Object.keys(refs)
                .filter((key) => refs[key] && refs[key].value && key !== "pwd1")
                .reduce((obj, key) => {
                    obj[key] = refs[key].value
                    return obj
                }, {})
            if (validate_pwd(pwd, pwd1)) {
                Object.keys(refs).forEach((k) => refs[k].value = "")
                dispatch({type: ActionTypes.UPDATE_PROFILE, changed})
            }
        }
        
    })
)(profileForm)

export default ProfileForm