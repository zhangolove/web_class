import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FieldGroup, validate_pwd, validate_dob } from '../forms.js'
import { goToPage, Locations } from './authActions'







class register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        const {dob, pwd0, pwd1} = this.state
        if (validate_dob(dob) && validate_pwd(pwd0, pwd1)) {
            this.props.redirect()
        } else {
            e.preventDefault();
        }
 
    }

    handleChange(event, key) {
        event.target.setCustomValidity('')
        this.setState({[key]: event.target});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h2> Register </h2>
            <FieldGroup
                id="formControlsAccountName"
                type="text"
                label="Account Name"
                placeholder="Enter Account Name"
                pattern="^[A-Za-z][A-Za-z0-9]+"
                required
            />
            <FieldGroup
                id="formControlsDisplayName"
                type="text"
                label="Display Name"
                placeholder="Enter Display Name"
            />
            <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="Enter email"
                pattern="^[A-Za-z0-9]+@[A-Za-z0-9.]+\.[a-zA-Z]+$"
                required
            />

            <FieldGroup
                id="formControlsDob"
                type="date"
                label="Date of Birth"
                placeholder="Enter Date of Birth"
                onChange={(e)=> this.handleChange(e, "dob")}
                required
            />

            <FieldGroup
                id="formControlsPhone"
                type="tel"
                label="Phone"
                placeholder="Enter 10 digit number"
                pattern="^\d{10}$"
                required
            />
            
            <FieldGroup
                id="formControlsZipcode"
                type="text"
                label="Zipcode"
                placeholder="Enter 5-digit Zipcode"
                pattern="^\d{5}$" 
                required
            />
            <FieldGroup
                id="formControlsPassword0"
                label="Password"
                type="password"
                onChange={(e)=> this.handleChange(e, "pwd0")}
                required
            />
            <FieldGroup
                id="formControlsPassword1"
                label="Confirm Password"
                type="password"
                onChange={(e)=> this.handleChange(e, "pwd1")}
                required
            />
            <Button type="submit">
                Register
            </Button>
        </form>
        )
    }
}





const Register = connect(
    null, 
    (dispatch) => ({
        redirect: () => dispatch(goToPage(Locations.MAIN))
    })
)(register)

export default Register