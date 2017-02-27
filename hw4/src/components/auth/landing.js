import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'
import { PageHeader } from 'react-bootstrap'

const Landing = () => (
    <div>
        <PageHeader>
            Welcome Back!
        </PageHeader>
        <Login />
        <Register />
    </div>
)


export default Landing