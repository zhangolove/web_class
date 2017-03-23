import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavbarInstance, toLink} from '../nav'
import Login from './login'
import Register from './register'
import Message from '../message'
import { Grid, Col, Row, PageHeader } from 'react-bootstrap'

const Landing = () => (
    <div>
        <Message />
        <NavbarInstance brand={{text: "Welcome Back!"}} links={[]}/>
        <Grid>
            <Row>
                <Col sm={10} smOffset={1} md={6} mdOffset={3}><Login /></Col>
            </Row>
            <Row>
                <Col sm={10} smOffset={1} md={6} mdOffset={3}><Register/></Col>
            </Row>
        </Grid>
    </div>
)


export default Landing