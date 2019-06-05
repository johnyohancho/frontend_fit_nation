import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui size huge secondary menu">
            <a className="item">Home</a>
            <a className="item">Messages</a>
            <a className="item">Friends</a>
            <div className="ui center aligned container">
                <img src='Fit Nation Logo.jpg' alt="oops"></img>
            </div>
            <div className="right menu">
                <div className="item">
                    <div className="ui icon input">
                    <input type="text" placeholder="Search..." /><i aria-hidden="true" className="search icon"></i>
                    </div>
                </div>
                { localStorage.getItem('token') ?
                <Link to='/login' className='item'>Login</Link>
                :
                <Link to='/' className='item'>Logout</Link>
                }
            </div>
        </div>
    )
}

export default Header;