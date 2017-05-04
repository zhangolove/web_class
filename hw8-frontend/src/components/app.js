import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Locations } from '../actions'

import Main from './main/main'
import Profile from './profile/profile'
import Landing from './auth/landing'


const pages = ({location}) => {
    if (location == Locations.MAIN) {
        return <Main />
    } else if (location == Locations.PROFILE) {
        return <Profile />
    } else {
        return <Landing />
    }
}

const App = connect(
    (state) => ({location: state.location}),
    null
)(pages)

export default App