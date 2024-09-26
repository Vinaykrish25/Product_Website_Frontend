import React from 'react';
import logo from "../Assets/logo.png";
import "./Styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import Api from './Api'; // Import the Api utility

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Api.post('/users/logout', {}, { withCredentials: true });
            navigate('/'); // Redirect to login page after logout
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <div className='header-container'>
            <div className='header-logo'>
                <Link to="/home"><img src={logo} alt="v-commerce" width={50} height={50} /></Link>
                <h2>V-Commerce</h2>
            </div>
            <div className="navbars-toggle">
                <div className='nav-bars'>
                    <Link to="/home">Home</Link>
                    <Link>Contact</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    <Link to="/index" onClick={handleLogout}>Logout</Link>
                </div>
                <div className='header-toggle'>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Header;
