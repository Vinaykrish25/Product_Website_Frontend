import React, { useState } from 'react';
import "./Styles/Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Api from './Api';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        // role: 'user'  // Default role set to 'user'
    });

    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const user_Val = /^[0-9A-Za-z]{5,20}$/;
    const email_Val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const password_Val = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    async function handleRegister() {
        if (user.password !== user.confirmpassword) {
            setErr("Passwords do not match");
            return;
        }
        if (user_Val.test(user.username) && email_Val.test(user.email) && password_Val.test(user.password)) {
            try {
                const newUser = await Api.post("http://localhost:5000/users/register", user);
                console.log(newUser.data);
                navigate("/login");
            } catch (error) {
                setErr("Error registering user");
                console.error(error);
            }
        } else {
            setErr("Enter valid credentials");
        }
    }

    return (
        <div id='signup-container'>
            <div id="Container">
                <p style={{ color: "red", textAlign: "center" }}>{err}</p>
                <p id="signupHead">Register</p>
                <div id="signupInputs">
                    <div id="sign-user">
                        <label>Username<span style={{ color: "red" }}>*</span></label>
                        <input
                            name='username'
                            type="text"
                            placeholder="Enter your username"
                            id="usernameInput"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required
                        />
                    </div>
                    <div id="sign-email">
                    <label>E-mail<span style={{ color: "red" }}>*</span></label>
                        <input
                            name='email'
                            type="text"
                            placeholder="Enter your e-mail"
                            id="useremailInput"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>
                    <div id="sign-pass">
                        <label>New Password<span style={{ color: "red" }}>*</span></label>
                        <input
                            name='password'
                            type="password"
                            placeholder="Enter your password"
                            id="newpasswordInput"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                        />
                    </div>
                    <div id="sign-confpass">
                        <label>Confirm Password<span style={{ color: "red" }}>*</span></label>
                        <input
                            name='confirmpassword'
                            type="password"
                            placeholder="Confirm your password"
                            id="confirmpasswordInput"
                            value={user.confirmpassword}
                            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                            required
                        />
                    </div>
                    {/* <div id="sign-role">
                        <label>Role (<span>If you are not admin you can skip this field</span>)</label>
                        <select name='role' id='roles-sign' value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div> */}
                </div>
                <button id="signupBtn2" onClick={handleRegister}>Submit</button>
                <Link to="/login"><h4><IoIosArrowBack />Login</h4></Link>
            </div>
        </div>
    );
};

export default Signup;
