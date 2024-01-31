import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useUser} from '../components/UserContext';


const UserDashboard = () => {
    //declarations
    const { loginUserId } = useUser();
    const [userData,setUserData] = useState(null)


    //functions and handlers
    useEffect(() => {
        if (loginUserId) {
            axios.get(`http://localhost:5000/api/users/${loginUserId}`)
                .then(res => {
                    console.log('response Data: ', res.data);
                    const user = {
                        fullName: res.data.fullName,
                        email: res.data.email,
                        isAdmin: res.data.isAdmin,
                        isBarber: res.data.isBarber
                    };
                    // Use a callback in setUserData to handle the asynchronous nature
                    setUserData(prevUserData => {
                        console.log("userData state: ", prevUserData);
                        return user;
                    });
                })
                .catch(error => {
                    console.log('error getting user by id: ', error);
                });
        }
    }, [loginUserId]);

    return (
        <div>
            <h1 style={{fontSize: '70px'}}>
                {userData ? userData.fullName : "Loading..."}
            </h1>
        </div>
    )
}

export default UserDashboard