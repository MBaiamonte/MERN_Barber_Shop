import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {useUser} from '../components/UserContext';
import {Container, Row, Col, Button, Form, Card, Table} from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
    //declarations
    const { loginUserId } = useUser();
    const [userData,setUserData] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [allAppointments, setAllAppointments] = useState([])
    const [serviceDetails, setServiceDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    //functions and handlers
    useEffect(() => {
        if (loginUserId) {
            // Fetch user appointments
            axios.get(`http://localhost:5000/api/appointments/user/${loginUserId}`)
                .then(appointmentsRes => {
                    console.log('appointment data:' , appointmentsRes.data)
                    setAllAppointments(appointmentsRes.data);

                    // Extract unique service ids
                    const serviceIds = [...new Set(appointmentsRes.data.map(appointment => appointment.service))];

                    // Fetch service details for each id
                    const serviceRequests = serviceIds.map(serviceId =>
                        axios.get(`http://localhost:5000/api/services/${serviceId}`)
                    );
                    // Use Promise.all to wait for all service requests
                    Promise.all(serviceRequests)
                    .then(serviceResponses => {
                        const serviceDetails = serviceResponses.map(response => response.data);
                        console.log('Service Details:', serviceDetails);
                        setServiceDetails(serviceDetails);
                        setIsLoading(false);

                    })
                    .catch(error => {
                        console.log('Error getting service details:', error);
                    });
                })
                .catch(appointmentsError => {
                    console.log('Error getting user appointments: ', appointmentsError);
                });
        }
    }, [loginUserId]);

    useEffect(() => {
        if (loginUserId) {
            axios.get(`http://localhost:5000/api/users/${loginUserId}`)
                .then(res => {
                    setFullName(res.data.fullName);
                    setEmail(res.data.email);
                    setPhoneNumber(res.data.phoneNumber);
                    setUserData(res.data);
                    })
                .catch(error => {
                    console.log('error getting user by id: ', error);
                });
        }
    }, [loginUserId]);

    const updateFormHandler = (e)=>{
        console.log('update submit clicked, finish handler have it do something');
    }

    if (isLoading) {
        return <p>Loading...</p>; // Render a loading message or spinner while data is being fetched
    }
    return (
        <Container className='profile-container'>
            <Row className='profile-header'>
                <Col className='col-7 header-col'>
                    <h1 id='profile-title-h1'>Welcome, {fullName}</h1>
                </Col>
            </Row>
            <Row className='profile-body'>
                <Col className='col-4'>
                    <Card className='profile-update-card' style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title id='profile-card-title'>Update your info</Card.Title>
                            <Card.Text>
                                <Form onSubmit={updateFormHandler}>
                                    <Form.Group className="mb-3" controlId="fullName">
                                        <Form.Label className='profile-label'>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder={fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label className='profile-label'>Email</Form.Label>
                                        <Form.Control type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="phoneNumber">
                                        <Form.Label className='profile-label'>Phone Number</Form.Label>
                                        <PhoneInput placeholder="Add your phone number" defaultCountry="US" value={phoneNumber} onChange={ (e) => setPhoneNumber(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className='profile-label'>Password</Form.Label>
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
                                <th>Service</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allAppointments.map((appointment, index) => {
                            try {
                                const appointmentDate = new Date(appointment.date);
                                const serviceDetail = serviceDetails[index];

                                return (
                                    <tr key={appointment._id}>
                                        <td>{appointmentDate.toLocaleDateString()} {appointmentDate.toLocaleTimeString()}</td>
                                        <td>{serviceDetail ? serviceDetail.title : 'Unknown Service'}</td>
                                        <td>{serviceDetail ?  `$${serviceDetail.price}` : 'Unknown Price'}</td>
                                    </tr>
                                );
                            } catch (error) {
                                console.error('Error parsing date:', error);
                                return null; // or handle the error as needed
                            }
                        })}
                        </tbody>
                        </Table>
                        <Col className='col-4 '>
                            <Link><Button id='profile-book-btn'>Book New Appointment!</Button></Link>
                        </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default UserDashboard