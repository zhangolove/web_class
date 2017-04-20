import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, 
        FormControl, HelpBlock } from 'react-bootstrap'


const FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
)

const validate_pwd = (pwd0, pwd1) => {
    if (!pwd0 && !pwd1) {
        return true
    }else if (!pwd0 || !pwd1) {
        return false
    }
    if (pwd0.value !== pwd1.value) {
        pwd1.setCustomValidity("password does not match")
        return false
    }
    return true
}


const validate_dob = (dob_field) => {
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

//these are used by many components
export {FieldGroup, validate_pwd, validate_dob}