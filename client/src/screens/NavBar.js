import {useSelector, useDispatch} from 'react-redux';
// import { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from 'react-router-dom';
const NavBar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authReducer).user;
    const logOut = ()=>{
        localStorage.removeItem("user");
        dispatch({type : 'LOG_OUT'});
    }
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    medCabinet
                </Link>
                {/* verify if this home page is needed since we already have dashboard and / */}
                <div className="navbar-nav mr-auto">
                    {currentUser ? ( <li className="nav-item">
                        <Link to={"/dashboard"} className="nav-link">
                            Dashboard
                        </Link>
                    </li>) : <></>}
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    My Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
          </nav>
          </div>
)
}

export default NavBar ;