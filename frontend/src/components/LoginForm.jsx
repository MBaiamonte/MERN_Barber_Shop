import FormContainer from './FormContainer'
// import { useAuth } from './AuthContext';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate , Link} from 'react-router-dom';
import '../styles/Login.css';


export const LoginForm = () => {

//Declarations and State Management 
    // const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    // const navigate = useNavigate();
    // const payload = {email, password};

    //Handlers and Functions
    const loginHandler =() => {
        console.log('login attempted, finish handler to handle functionality')
    }

    return (
        <Row id='container'>
            <Col id='left-col'></Col>
            <Col className='login-col col-8'>
                <FormContainer>
                <h1>Sign In</h1>
                    <Form onSubmit={loginHandler}>
                        <Form.Group controlId='email' className='my-3'>
                            <Form.Label >Email:</Form.Label>
                                <Form.Control
                                    className='form-inputs'
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className='my-3'>
                            <Form.Label className='form-label'>Password</Form.Label>
                                <Form.Control
                                    className='form-inputs'
                                    type='password' 
                                    placeholder='Enter Password' 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Button id='btn' type='submit' variant='primary' className='mt-2' > Sign In </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col >
                            <div className='register'>
                                <p>
                                    New Customer? <Link to={'/register'} className='link'>Register Here</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </FormContainer>
            </Col>
        </Row>
        
    )
}
