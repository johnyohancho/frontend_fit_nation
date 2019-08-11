import React from 'react';
import './css/Home.css';
import { Header, Image } from 'semantic-ui-react';

class Home extends React.Component {

    render() {
        return (
            <div className="home-background">
                <Image className='transparent' id='fitness_guru_logo' src='./fitness_guru_logo.png'/>
            </div>
        )
    }
}

export default Home;