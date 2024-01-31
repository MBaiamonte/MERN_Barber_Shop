import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, Button, Row} from 'react-bootstrap'
import axios from 'axios';
import '../styles/Services.css';
import {Link} from 'react-router-dom';

const Services = () => {
    const [allServices, setAllServices] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get('http://localhost:5000/api/services/all');
                console.log('get all services value: ', response.data);
                setAllServices(response.data)
            } catch (error){
                console.error('Error fetching service data: ', error.message)
            }
        }
        fetchData();
    }, [])



    return (
    <div className='service'>
        <h1 className='service-h1'>Our Services</h1>
        <div className='services-container'>
            {allServices.map((service, index)=>{
                return(
                        <Card key={index} className='service-cards'>
                            <Card.Body>
                                <Card.Title className='service-title'>{service.title}</Card.Title>
                                <Card.Subtitle>
                                    <div className='service-subtitle'>
                                        <p className='service-p'>{service.duration} min</p>
                                        <p className='service-p'>${service.price}</p>
                                    </div>
                                </Card.Subtitle>
                                <Card.Text>{service.description}</Card.Text>
                            <Link to='/booking'><Button>Book Now</Button></Link>
                            </Card.Body>
                        </Card>
                )
            })}
        </div>

    </div>
    )
}

export default Services