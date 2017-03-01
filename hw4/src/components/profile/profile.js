import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavbarInstance, toLink } from '../nav'
import { Locations} from '../../enums'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import { Grid, Col, Row } from 'react-bootstrap'

const profile = ({profileNavBar}) => (
     <div>
        <NavbarInstance {...profileNavBar} />
        <Grid className="show-grid">
            <Row>
                <Col sm={3}  md={3}><Avatar /></Col>
                <Col sm={9}  md={9} ><ProfileForm /></Col>
            </Row>
            
        
        </Grid>
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


