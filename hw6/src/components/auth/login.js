import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { FieldGroup } from '../forms'
import { loginAndRedirect } from './authActions'
import ReactDOM from 'react-dom'

const login = ({redirect}) => {
    let username, password

    const handleSubmit = (e) => {
        e.preventDefault();
        redirect(username.value, password.value)
    }
    
    return(
    <form onSubmit={handleSubmit}>
        <h2> Login </h2>
        <FormGroup id="formControlsUsername">
            <ControlLabel>Username</ControlLabel>
            <FormControl type="text" placeholder="Enter username" 
                ref={(node)=>{username=ReactDOM.findDOMNode(node)}} required/>
        </FormGroup>
        <FormGroup id="formControlsPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" placeholder="Enter username" 
                ref={(node)=>{password=ReactDOM.findDOMNode(node)}} required/>
        </FormGroup>
        <Button type="submit">
            Login
        </Button>
    </form>
    )
}

login.PropTypes = {
    redirect: PropTypes.func.isRequired
}

const Login = connect(
    null,
    (dispatch) => ({
        redirect: (username, password) => 
                    loginAndRedirect(username, password)(dispatch)
    })
)(login)

export default Login