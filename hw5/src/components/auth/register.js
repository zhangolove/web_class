import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import {Locations, ActionTypes} from '../../actions'
import { registerAction} from './authActions'

const registerForm = ({validate}) => {
    const refs = {}

    const onChange = (e) => {e.target.setCustomValidity('')}
    //to save space, instead of listing the fields as <FormGroup>, 
    //I list the fields compactly as objects
    //which also makes it easier to insert ref and avoid repetition
    const fields = [
        {id: "username", type: "text", label: "Account Name", 
          pattern: "^[A-Za-z][A-Za-z0-9]+", placeholder: "Enter Account Name"},
        {id: "dname", type: "text", label: "Display Name", 
                                placeholder: "Enter Display Name"},
        {id: "email", type: "email", label: "Email address", 
                            placeholder: "Enter email",
            pattern:"^[A-Za-z0-9]+@[A-Za-z0-9.]+\\.[a-zA-Z]+$"},
        {id: "dob", type: "date",label:"Date of Birth",
                        placeholder: "Enter Date of Birth", onChange},
        {id: "phone", type: "tel", label: "Phone", 
                placeholder: "Enter 10 digit number", pattern: "^\\d{10}$"},
        {id: "zipcode", type: "text", label: "Zipcode", 
                    placeholder: "Enter 5-digit Zipcode", pattern: "^\\d{5}$"},
        {id: "pwd1", type: "password", label: "Password", onChange},
        {id: "password", type: "password", label: "Confirm Password", onChange}
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        validate(refs)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2> Register </h2>
            {
            fields.map(({label,id, ...props}, idx) => {
                return(
                <FormGroup key={idx}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} 
                        ref={(node)=>{refs[id]=ReactDOM.findDOMNode(node)}}
                        required/>
                </FormGroup>
            )})
            }
            <Button type="submit">
                Register
            </Button>
        </form>
    )
}

registerForm.PropTypes = {
    validate: PropTypes.func.isRequired
}


const Register = connect(
    null, 
    (dispatch) => ({
        validate: (refs) => {
            registerAction(refs)(dispatch)
        }
    })
)(registerForm)

export default Register