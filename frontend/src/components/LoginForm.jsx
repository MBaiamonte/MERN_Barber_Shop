import FormContainer from './FormContainer'
import { useAuth } from './AuthContext';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate , Link} from 'react-router-dom';
// import {toast, Bounce} from 'react-toastify';


export const LoginForm = () => {

//Declarations and State Management 
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const navigate = useNavigate();

    //Handlers and Functions
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
                const res = await axios.post(`http://localhost:5000/api/login`, {email, password})
                console.log('Login API Response:', res.data); // Log the entire response to see its structure
                const token = res.data.token;
                console.log("Logged in. Token: ", token);
                login(token);
                navigate('/')
                console.log('Login Successful')
        } catch (error) {
            console.error('Login failed:', error.message);
            // toast.error(error.error, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            //     transition: Bounce,
            //     });
        }
    };


    return (
        <Row className='5'>
            <Col>
                {/* image for left side of screen here */}
            </Col>
            <Col>
                <FormContainer>
                <h1>Welcome Back, Sign In</h1>
                    <Form onSubmit={loginHandler}>
                        <Form.Group controlId='email' className='my-3'>
                            <Form.Label >Email:</Form.Label>
                                <Form.Control 
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className='my-3'>
                            <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type='password' 
                                    placeholder='Enter Password' 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='mt-2' > Sign In </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col style={{color: '#6987a5'}}>
                            New Customer? <Link to={'/register'}>Register</Link>
                        </Col>
                    </Row>
                </FormContainer>
            </Col>
        </Row>
        
    )
}
