import React from 'react';
import '../App.css'

const Register = (props) => {
    console.log(props)
    const {name,email,password,passwordVerify, 
        setName, setEmail, setPassword, setPasswordVerify,
        handleRegister } = {...props};


    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangePasswordVerify = (e) => {
        const passwordVerify = e.target.value;
        setPasswordVerify(passwordVerify);
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    alt='profile-img'
                    className='profile-img-card'
                />

                <form onSubmit={handleRegister}>
                    <div className='form-group' style={{display:"flex", justifyContent:"left"}}>
                        <label htmlFor="name">Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={name}
                            onChange={onChangeName}/>
                    </div>

                    <div className='form-group' style={{display:"flex", justifyContent:"left"}}>
                        <label htmlFor="email">Email</label>
                        <input
                            type='text'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={onChangeEmail}/>
                    </div>
                    <div className='form-group' style={{display:"flex", justifyContent:"left"}}>
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            value={password}
                            onChange={onChangePassword}/>
                    </div>

                     <div className='form-group' style={{display:"flex", justifyContent:"left"}}>
                        <label htmlFor="passwordverify">Re-enter Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='passwordverify'
                            value={passwordVerify}
                            onChange={onChangePasswordVerify}/>
                    </div>  

                    <div className="form-group" style={{display:"flex", justifyContent:"center"}}>
                        <button className="btn-header">Sign Up</button>
                    </div>                                                        
                </form>
            </div>
        </div>
    )
}

export default Register;