import React from 'react';
import PropTypes from 'prop-types';
import AccountsUIWrapper from '../../AccountsUIWrapper.js';
import { Navbar, Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class TitleBar extends React.Component{
    renderSubTitle(){
        if(this.props.subTitle){
            return <h2>{this.props.subTitle}</h2>;
        }
    }

    render(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Crypto Currency Exchange</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <span> <AccountsUIWrapper/></span>
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            How it works
                        </NavItem>
                        <NavItem eventKey={3} href="#">
                            About Us
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};
