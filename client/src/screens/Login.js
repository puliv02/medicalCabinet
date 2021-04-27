import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { login, dashboard } from '../actions/auth';
import LoginComponent from '../components/LoginComponent'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log(email)
            console.log(password)
            const res = await login(
                {
                    email: email,
                    password: password
                }
            );
            console.log(res.data.user);
            window.localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({
                type: 'LOGIN_USER',
                payload: res.data.user
            });
            toast.success("Logged in!");
            const token = JSON.parse(window.localStorage.getItem('user')).token
            const test = await dashboard(token)
            console.log(test);
            history.push('/dashboard')

        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className='col-md-12'>
            <LoginComponent email={email} password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleLogin={handleLogin} />
        </div>
    );
};

export default Login;

