import React from 'react';
import './css/NavBar.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div className='ui size huge secondary menu' id='nav-bar'>
            <Link to='/' className='item'>
                <div className='content'>Home</div>
            </Link>
            <Link to='/workouts' className='item'>
                <div className='content'>Workouts</div>
            </Link>
            <Link to='/meals' className='item'>
                <div className='content'>Meals</div>
            </Link>
            {/* <Link to='/bets' className='item'>
                <div className='content'>Bets</div>
            </Link>
            <Link to='/fitness_gurus' className='item'>
                <div className='content'>Fitness Gurus</div>
            </Link> */}
            {/* <div className='ui center aligned container'>
                <Link to='/' className='item'>
                    <img src='Fit Nation Logo.jpg' alt="oops"></img>
                </Link>
            </div> */}
            <div className="right menu">
                <div className="item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Coming Soon..." /><i aria-hidden="true" className="search icon"></i>
                    </div>
                </div>
                {props.loggedIn ?
                <Link to='/' className='item' onClick={() => props.dispatch({ type: 'USER_LOGOUT' })}>
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


let mapStateToProps = (state) => {
    let loginStatus = state.session_reducer.loggedIn
    return {
        loggedIn: loginStatus
    }
}

export default connect(mapStateToProps)(NavBar);