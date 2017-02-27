import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FieldGroup } from './forms.js'


const login = () => (
    <form>
        <h2> Login </h2>
        <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
        />
        <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
        />
        <Button type="submit">
            Login
        </Button>
    </form>
)

const Login = connect()(login)

export default Login