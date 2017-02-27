import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'


const FieldGroup = ({ id, label, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
)

export {FieldGroup}