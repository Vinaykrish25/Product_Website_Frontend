import React from 'react'
import logo from "../Assets/poster.png"
import "./Styles/Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className='footer-container'>
                <div className='footer-image'>
                    <Link to="/home"><img src={logo} alt="v-commerce" width={100} height={100} /></Link>
                    <p>V-Commerce is your one-stop online marketplace, offering a wide range of quality products at competitive prices. Shop with confidence, enjoy seamless transactions, and experience fast delivery with our trusted service</p>
                </div>
                <div className='footer-links'>
                    <div className='icons'>
                        <h2 style={{ color: "blue" }}><FaFacebook /></h2>
                        <h2 style={{ color: "rgb(226, 52, 185)" }}><FaInstagram /></h2>
                        <h2 style={{ color: "rgb(64, 143, 226)" }}><FaLinkedin /></h2>
                        <h2 style={{ color: "red" }}><FaYoutube /></h2>
                    </div>
                    <div className='names'>
                        <p>V-Commerce@official</p>
                        <p>V-Commerce@official</p>
                        <p>V-Commerce</p>
                        <p>V-Commerce</p>
                    </div>
                </div>
                <div className="footer-address">
                    <div className="contact-icons">
                        <h2><MdLocationPin /></h2>
                        <h3><FaPhoneAlt /></h3>
                    </div>
                    <div className="contact">
                        <p>47, Process Server Street, Unione Mill Road, Tiruppur - 641 601</p>
                        <p>+91 8754345330</p>
                    </div>
                </div>
            </div>
            <div className="copyrights">
                <p> © V - Commerce Inc. 2024 - All Rights reserved </p>
            </div>
        </div>
    )
}

export default Footer
