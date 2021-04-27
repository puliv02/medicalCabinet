import React from 'react';
import '../App.css'

const Login = (props) => {
    console.log(props)
    const {email,password, setEmail, setPassword, handleLogin } = {...props};

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    alt='profile-img'
                    className='profile-img-card'
                />

                <form onSubmit={handleLogin}>

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

                    <div className="form-group" style={{display:"flex", justifyContent:"center"}}>
                        <button className="btn-header">Login</button>
                    </div>                                                        
                </form>
            </div>
        </div>
    )
}

export default Login;