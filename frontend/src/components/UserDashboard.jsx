import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {useUser} from '../components/UserContext';
import {Container, Row, Col, Button, Form, Card, Table} from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


const UserDashboard = () => {
    //declarations
    const { loginUserId } = useUser();
    const [userData,setUserData] = useState(null)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()




    //functions and handlers
    useEffect(() => {
        if (loginUserId) {
            axios.get(`http://localhost:5000/api/users/${loginUserId}`)
                .then(res => {
                    console.log('response Data: ', res.data);
                    // const user = {
                    //     fullName: res.data.fullName,
                    //     email: res.data.email,
                    // };
                    setFullName(res.data.fullName)
                    setEmail(res.data.email)
                    setPhoneNumber(res.data.phoneNumber)
                    // Use a callback in setUserData to handle the asynchronous nature
                    // setUserData(prevUserData => {
                    //     console.log("userData state: ", prevUserData);
                    //     return user;
                    setUserData(res.data)
                    // });
                })
                .catch(error => {
                    console.log('error getting user by id: ', error);
                });
        }
    }, [loginUserId]);

    const updateFormHandler = (e)=>{
        console.log('update submit clicked, finish handler have it do something')
    }


    return (
        <Container style={{backgroundColor: 'aquamarine'}}>
            <Row>
                <h1>Welcome {fullName} </h1>
                <Link><Button>Book New Appointment!</Button></Link>

            </Row>
            <Row>
                <Col className='col-4'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Update your info</Card.Title>
                            <Card.Text>
                                <Form onSubmit={updateFormHandler}>
                                    <Form.Group className="mb-3" controlId="fullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder={fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <PhoneInput placeholder="Add your phone number" defaultCountry="US" value={phoneNumber} onChange={ (e) => setPhoneNumber(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password"/>
                                    </Form.Group>
                    {/* add conditions disabled button button if password not entered */}
                                    <Button variant="primary" type="submit">Update info</Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Col>
                        <h4>
                            Next Appointment:
                        </h4> 
                        <p>Date of next appointment/conditional render if none</p>
                    </Col>
                    <Table striped hover>
                        <thead>
                            <tr>
                            <th>Past Appointments</th>
                            <th>Date</th>
                            <th>Service</th>
                            <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Appointment name</td>
                                <td>jan 30th</td>
                                <td>Beard Trim</td>
                                <td>$$$$</td>
                            </tr>
                        </tbody>
                        </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default UserDashboard