import React from 'react';
import {Row,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../styles/Welcome.css'

const Welcome = () => {
    return (
        <>
            <Row className='row-1'>
                {/* <div className='center-content'> */}
                    <p>
                        Your only as good as your last Haircut
                        <p>- Edward ScissorHands</p>
                        <Button style={{backgroundColor: 'white'}}><Link to='/appointments'>Book Now</Link></Button>
                    </p>
                {/* </div> */}
                
            </Row>
        </>
    )
}

export default Welcome