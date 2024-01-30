import FormContainer from './FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, {useState} from 'react';
import {useNavigate , Link} from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';


export const LoginForm = ({setLoggedUser}) => {

//Declarations and State Management 
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const navigate = useNavigate();


    //Handlers and Functions
    const loginHandler =(e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/login', {email, password}, {withCredentials: true})
            .then( res =>{
                const userToLogin = {
                    fullName: res.data.fullName,
                    email: res.data.email,
                    userId: res.data._id,
                }
                console.log(res.data)
                setLoggedUser(userToLogin);
                navigate('/')
            })
            .catch(err =>{
                console.log('error with login:', err )
            })
    }

    return (
        <Row className='login-container'>
            <Col className='login-left-col'></Col>
            <Col className='login-col col-8'>
                <FormContainer>
                <h1 className='login-h1'>Sign In</h1>
                    <Form onSubmit={loginHandler}>
                        <Form.Group controlId='email' className='my-3'>
                            <Form.Label className='login-form-label' >Email:</Form.Label>
                                <Form.Control
                                    className='login-form-inputs'
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className='my-3'>
                            <Form.Label className='login-form-label'>Password</Form.Label>
                                <Form.Control
                                    className='login-form-inputs'
                                    type='password' 
                                    placeholder='Enter Password' 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Button className='login-btn' type='submit' variant='primary' > Sign In </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col >
                            <div className='login-register'>
                                <p className='login-p'>
                                    New Customer? <Link to={'/register'} className='login-link'>Register Here</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </FormContainer>
            </Col>
        </Row>
        
    )
}
