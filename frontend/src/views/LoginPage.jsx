import React from 'react'
import { LoginForm } from '../components/LoginForm';

const LoginPage = ({setLoggedUser}) => {
    return (
        <LoginForm setLoggedUser={setLoggedUser}/>
    )
}

export default LoginPage