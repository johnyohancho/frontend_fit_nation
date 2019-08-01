import React from 'react';
import './css/NavBar.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const NavBar = (props) => {

    function changeForm() {
        props.dispatch({ type: "CHANGE_TO_LOGIN"})
    }

    if (props.loggedIn === true) {
        return (
            <div className='ui size huge secondary menu' id='nav-bar'>
            <ul>
                <Link to='/dashboard' className='item' id='active'>
                    <div className='content'>Dashboard</div>
                </Link>
                <Link to='/daily' className='item' id='active' onClick={() => changeForm()}>
                    <div className='content'>Daily</div>
                </Link>
                <Link to='/history' className='item' id='active' onClick={() => changeForm()}>
                    <div className='content'>History</div>
                </Link>
                <Link to='/workouts' className='item' id='active' onClick={() => changeForm()}>
                    <div className='content'>Workouts</div>
                </Link>
                <Link to='/meals' className='item' id='active' onClick={() => changeForm()}>
                    <div className='content'>Meals</div>
                </Link>
            </ul>
            <div className="right menu">
                <div className="item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Coming Soon..." /><i aria-hidden="true" className="search icon"></i>
                    </div>
                </div>
                <Link to='/' className='item' id='active' onClick={() => props.dispatch({ type: 'USER_LOGOUT' })}>
                    <div className='content'>Logout</div>
                </Link>
            </div>
        </div>
        )
    } else {
        return (
            <div className='ui size huge secondary menu' id='nav-bar'>
                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Coming Soon..." /><i aria-hidden="true" className="search icon"></i>
                        </div>
                    </div>
                    <Link to='/login' className='item' id='active' onClick={() => changeForm()}>
                        <div className='content'>Login</div>
                    </Link>
                </div>
            </div>
        )
    };
}


let mapStateToProps = (state) => {
    let loginStatus = state.session_reducer.loggedIn

    return {
        loggedIn: loginStatus
    }
}

export default connect(mapStateToProps)(NavBar);