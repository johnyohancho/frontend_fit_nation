import React from 'react';
import './css/Home.css';
import { Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (
            <Link to='/' className='item'>
                <div className="home-background">
                    <Image className='transparent' id='fitness_guru_logo' src='./fitness_guru_logo.png'/>
                </div>
            </Link>
        )
    }
}

export default Home;