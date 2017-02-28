import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FieldGroup } from './forms.js'
import { goToPage, Locations } from './authActions'


const login = ({redirect}) => (
    <form onSubmit={redirect}>
        <h2> Login </h2>
        <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
            required
        />
        <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
            required
        />
        <Button type="submit">
            Login
        </Button>
    </form>
)

const Login = connect(
    null,
    (dispatch) => ({
        redirect: () => dispatch(goToPage(Locations.MAIN))
    })
)(login)

export default Login