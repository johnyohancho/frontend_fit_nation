import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='ui size huge secondary menu'>
            <Link to='/' className='item'>
                <div className='content'>Home</div>
            </Link>
            <a className='item'>Workouts</a>
            <a className='item'>Meals</a>
            <a className='item'>Bets</a>
            <a className='item'>Fitness Guru</a>
            <div className='ui center aligned container'>
                <Link to='/' className='item'>
                    <img src='Fit Nation Logo.jpg' alt="oops"></img>
                </Link>
            </div>
            <div className="right menu">
                <div className="item">
                    <div className="ui icon input">
                    <input type="text" placeholder="Search..." /><i aria-hidden="true" className="search icon"></i>
                    </div>
                </div>
                {localStorage.getItem('token') ?
                <Link to='/' className='item'>
                    <div className='content'>Logout</div>
                </Link>
                :
                <Link to='/login' className='item'>
                    <div className='content'>Login</div>
                </Link> 

                }
            </div>
        </div>
    )
}

export default Header;