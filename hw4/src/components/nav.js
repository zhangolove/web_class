import React, { PropTypes } from 'react'
import {Navbar, Nav, NavItem, MenuItem} from 'react-bootstrap'
import { connect } from 'react-redux'
import {ActionTypes} from '../enums'

export const NavbarInstance = ({brand, links}) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a>{brand.text}</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {links.map((l, idx) => (
            <NavItem key={idx} onClick={l.action}>{l.text}</NavItem>
        ))}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export const toLink = (text, dest, dispatch) => ({
    text,
    action: () => dispatch({type: ActionTypes.GO_TO_PAGE,  location: dest})
})