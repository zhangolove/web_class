import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavbarInstance } from '../nav'
import { Locations} from '../../enums'
import { toLink } from '../../utils'
import Avatar from './avatar'
import ProfileForm from './profileForm'


const profile = ({profileNavBar}) => (
    <div>
        <NavbarInstance {...profileNavBar} />
        <Avatar />
        <ProfileForm />
    </div>
)

const Profile = connect(
    null,
    (dispatch) => ({
        profileNavBar: {
            brand: toLink("Profile View", Locations.PROFILE, dispatch),
            links: [
                toLink("Main View", Locations.MAIN, dispatch),
                toLink("Log Out", Locations.LANDING, dispatch)
            ]
        }
    })
)(profile)

export default Profile