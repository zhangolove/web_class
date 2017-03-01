import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavbarInstance, toLink} from '../nav'
import { Grid, Col, Row } from 'react-bootstrap'
import { Locations} from '../../enums'
import Headline from './headline'
import Following from './following'
import ArticleViews from '../articles/articlesView'


// 
const main = ({mainNavBar}) => (
    <div>
        <NavbarInstance {...mainNavBar} />
        <Grid className="show-grid">
            <Row>
                <Col sm={3}  md={3}>
                    <Row><Col sm={12}  md={12} ><Headline /></Col></Row>
                    <Row><Col sm={12}  md={12} ><Following /></Col></Row>
                </Col>
            
                <Col sm={9}  md={9} ><ArticleViews /></Col>
                
            </Row>
            
        
        </Grid>
    </div>

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