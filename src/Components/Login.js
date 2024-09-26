import React, { useState, useEffect } from 'react';
import "./Styles/Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Api from './Api';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const response = await Api.post('/users/login', { username, password }, { withCredentials: true });
            console.log(response.data);
            
            // Redirect based on role
            if (response.data.data.role === 'admin') {
                navigate('/products');
            } else {
                navigate('/home');
            }
        } catch (err) {
            console.error('Error in login', err);
        }
    }

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await Api.post('/users/verify', {}, { withCredentials: true });
                if (response.status === 200) {
                        setIsAuthenticated(true);
                        navigate('/home');
                    }
            } catch (err) {
                console.error('User is not authenticated');
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (isAuthenticated) {
        return <p>You are already logged in. Redirecting...</p>;
    }

    return (
        <div id='login-container'>
            <div id="log-Container">
                <p id="loginHead">Login</p>
                <div id="loginInputs">
                    <div id='log-user'>
                        <label>Username<span style={{ color: "red" }}>*</span></label>
                        <input
                            id='user'
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div id="log-pass">
                        <label>Password<span style={{ color: "red" }}>*</span></label>
                        <input
                            id='pass'
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button id="loginBtn2" onClick={handleSubmit}>Login</button>
                <Link to="/signup"><h4><IoIosArrowBack />Register</h4></Link>
            </div>
        </div>
    );
};

export default Login;
