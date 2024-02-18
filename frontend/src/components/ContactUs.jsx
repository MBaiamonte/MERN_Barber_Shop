import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import '../styles/ContactUs.css';

const ContactUs = () => {
    //Declarations
    const ticTokIconPath = '/images/tiktok_icon.png';
    const facebookIconPath = '/images/facebook_icon.png';
    const snapchatIconPath = '/images/snapchat_icon.png';
    const twitterIconPath = '/images/twitter_icon.png';
    const instagramIconPath = '/images/instagram_icon.png';
    return (
        <>
            <Row className='contactUs-row'>
                <h1 className='contactUs-header-h3'>Contact Us</h1>
            </Row>
            <Row className='contactUs-location-row'>
                <Col className='contactUs-col'>
                    <h5 id='contactUs-location-h5'>Location</h5>
                    <p className='contactUs-location-p'>47th St.</p>
                    <p className='contactUs-location-p'>Denver, Colorado, 80532</p>
                    <p className='contactUs-location-p'>(746)-343-4566</p>
                </Col>
                <Col className='contactUs-col'>
                    google api
                </Col>
            </Row>
            <Row className='contactUs-socials-row'>
                <Col className='footer-social-icon-col'>
                    <Image src={facebookIconPath} rounded className='footer-social-icon' />
                    <p>Facebook</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={instagramIconPath} rounded className='footer-social-icon'/>
                    <p>Instagram</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={twitterIconPath} rounded className='footer-social-icon'/>
                    <p>Twitter</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={snapchatIconPath} rounded className='footer-social-icon'/>
                    <p>Snapchat</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={ticTokIconPath} rounded className='footer-social-icon'/>
                    <p>TikTok</p>
                </Col>
            </Row>
        </>
    )
}

export default ContactUs