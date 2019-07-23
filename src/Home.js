import React from 'react';
import './css/Home.css';
import { Header, Image } from 'semantic-ui-react';

class Home extends React.Component {

    render() {
        return (
            <div className="home-background">
                <Image id='fitness_guru_logo' src='./fitness_guru_logo.png'/>
            </div>
            // <div style={{ backgroundImage: 'url(./home_background.jpg)', backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100vw`, height: `100vh`, overflow: `hidden`}}>
            // </div>
        )
    }
}

export default Home;