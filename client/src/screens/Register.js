import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { register, dashboard } from '../actions/auth';
import RegisterComponent from '../components/RegisterComponent'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerfiy, setPasswordVerify] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(name)
            console.log(email)
            console.log(password)
            console.log(passwordVerfiy)
            const res = await register(
                {
                    name: name,
                    email: email,
                    password: password,
                    passwordVerify: passwordVerfiy
                }
            );
            console.log(res);
            window.localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({
                type: 'LOGIN_USER',
                payload: res.data.user
            });
            toast.success("Registered!");
            const token = JSON.parse(window.localStorage.getItem('user')).token
            const test = await dashboard(token)
            console.log(test);
            history.push('/dashboard')

        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        }
    } //end of handleRegister

    return (
        <div className='col-md-12'>
            <RegisterComponent name={name} email={email} password={password} passwordVerfiy={passwordVerfiy}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                setPasswordVerify={setPasswordVerify}
                handleRegister={handleRegister} />
        </div>
    );
};

export default Register;

