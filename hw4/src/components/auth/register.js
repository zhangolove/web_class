import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FieldGroup } from './forms.js'
import { goToPage, Locations } from './authActions'



const validate_pwd = (pwd0, pwd1) => {
    if (pwd0.value !== pwd1.value) {
        pwd1.setCustomValidity("password does not match")
        return fasle
    }
    return true
}


const validate_dob = (dob_field) => {
        console.log(`dob ${dob_field.value}`)
        const today = new Date();
        const dob = new Date(dob_field.value)
        let year = today.getFullYear() - dob.getFullYear()
        const month = today.getMonth() - dob.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
            year--;
        }
        if (year >= 18) {
            return true
        } else {
            const msg = "Only individuals 18 years of age or \
                older on the day of registration are allowed to register"
            dob_field.setCustomValidity(msg)
            return false
        }
}




class register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        console.log("handle submit")
        
        console.log(this.state)
        const {dob, pwd0, pwd1} = this.state
        if (validate_dob(dob) && validate_pwd(pwd0, pwd1)) {
            this.props.redirect()
        } else {
            e.preventDefault();
        }
 
    }

    handleChange(event, key) {
        console.log("change")
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