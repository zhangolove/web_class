import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FieldGroup } from './forms.js'

const register = () => (
    <form>
        <h2> Register </h2>
        <FieldGroup
            id="formControlsUsername"
            type="text"
            label="User Name"
            placeholder="Enter username"
        />
        <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
        />
        <FieldGroup
            id="formControlsZipcode"
            type="text"
            label="Zipcode"
            placeholder="Enter 5-digit Zipcode"
        />
        <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
        />
        <FieldGroup
            id="formControlsPassword"
            label="Confirm Password"
            type="password"
        />
        <Button type="submit">
            Register
        </Button>
    </form>
)

const Register = connect()(register)

export default Register