import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavbarInstance } from '../nav'
import { Locations} from '../../enums'
import { toLink } from '../../utils'


const main = ({mainNavBar}) => (
    <NavbarInstance {...mainNavBar} />

)

const Main = connect(
    null,
    (dispatch) => ({
        mainNavBar: {
            brand: toLink("Main View", Locations.MAIN, dispatch),
            links: [
                toLink("Profile", Locations.PROFILE, dispatch),
                toLink("Log Out", Locations.LANDING, dispatch)
            ]
        }
    })
)(main)

export default Main