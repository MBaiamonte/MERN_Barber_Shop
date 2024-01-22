import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Nav, Navbar,Button, Container, Badge, NavDropdown, Col, Row } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useAuth } from './AuthContext';
import '../styles/Header.css';


const Header = () => {
    //Declarations 
    const {userInfo, logout} = useAuth();
    const navigate= useNavigate();


    //Handlers and functions
    const logoutHandler = async ()=>{
        await logout();
        navigate('/login')
    }


    return (
        <Navbar  fixed="top" variant='dark'expand='lg' collapseOnSelect style={{backgroundColor: 'lightgrey'}}>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand className='d-flex'>
                        <Col className='logo-col'>
                            <img src='/images/barber_shop_logo.png' alt="logo"  className='logo'/>
                        </Col>
                        <Col className='store-name'>
                            <h4 className='title'>Edward ScissorHands</h4>
                            <h4 className='title'>Barber Shop</h4> 
                        </Col>
                    </Navbar.Brand>
                </LinkContainer>
                <LinkContainer to='/booking'>
                    <Nav.Link>Appointments</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/services'>
                    <Nav.Link>Services</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/contactUs'>
                    <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/user/dashboard'>
                    <Nav.Link>User Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/' onClick={logoutHandler}>
                    <Nav.Link>Logout</Nav.Link>

                </LinkContainer>
                <LinkContainer to='/login'>
                    <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
            </Container>          
        </Navbar>
    )
}

export default Header