import React from 'react';
import {Row,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../styles/Welcome.css';
import {useUser} from '../components/UserContext';

const Welcome = () => {
    //Declarations
    const { loginUserId } = useUser();
    return (
        <>
            <Row className='row-1'>
                    <p className='welcome-p'>
                        Your only as good as your last Haircut
                        <p className='welcome-p'>Edward ScissorHands</p>
                        {loginUserId === null ? (
                            <Button style={{backgroundColor: 'white'}}><Link to='/login'>Login To Book Appointment</Link></Button>
                        ) : (
                            <Button style={{backgroundColor: 'white'}}><Link to={`/appointment/${loginUserId}/book`}>Book Now</Link></Button>
                        )}
                    </p>
            </Row>
        </>
    )
}

export default Welcome;