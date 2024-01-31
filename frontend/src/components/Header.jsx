import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Nav, Navbar, NavDropdown, Col, Container } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import '../styles/Header.css';
import axios from 'axios';
import {useUser} from '../components/UserContext';


const Header = () => {
    //Declarations 
    const navigate= useNavigate();
    const { loginUserId } = useUser();


    //Handlers and functions
    const logoutHandler = async ()=>{
        await axios.post('http://localhost:5000/api/user/logout', {}, {withCredentials: true})
            .then( res =>{
                navigate('/login')
            })
            .catch(err =>{
                console.log('error with logout: ', err)
            })
    }//end logout handler

    const redirectToProfile = () => {
        if (loginUserId) {
            navigate(`/profile/${loginUserId}`);
        } else {
          // Handle case where loginUserId is not available (not logged in)
          // You may redirect to the login page or handle it as per your application's logic
            console.log('User not logged in');
        }
    };


    return (
        <Navbar  className='d-inline-flex d-flex justify-content-between'  variant='dark' expand='lg' collapseOnSelect style={{backgroundColor: '#7C2B2B'}}>
            <Container id='container'>

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
                    <Nav.Link className='nav-btn'>Appointments</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/services'>
                    <Nav.Link className='nav-btn'>Services</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/contactUs'>
                    <Nav.Link className='nav-btn'>Contact Us</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/aboutUs'>
                    <Nav.Link className='nav-btn'>About Us</Nav.Link>
                </LinkContainer>

                <NavDropdown title="User Stuff" id="basic-nav-dropdown" className='nav-btn ml-5'>
                    <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
                    <NavDropdown.Item onClick={redirectToProfile}> User Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
    )
}

export default Header