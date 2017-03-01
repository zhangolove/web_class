import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavbarInstance, toLink} from '../nav'
import { Locations} from '../../enums'
import Headline from './headline'
import Following from './following'
import ArticleViews from '../articles/articlesView'



const main = ({mainNavBar}) => (
    <div>
        <NavbarInstance {...mainNavBar} />
        <Headline />
        <Following />
        <ArticleViews />
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