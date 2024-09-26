import React from 'react'
import poster from "../Assets/poster.png"
import "./Styles/HomePage.css"
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='homepage-container'>
      <div className="homepage-poster">
        <img src={poster} alt="v-commerce" height={300} width={300} />
      </div>
      <div className="homepage-buttons">
        <Link to="/login"><a className='login'>Login</a></Link>
        <Link to="/signup"><a className='signup'>Signup</a></Link>
      </div>
    </div>
  )
}

export default HomePage