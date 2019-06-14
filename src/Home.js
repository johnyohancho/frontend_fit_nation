import React from 'react';
import './css/Home.css';

class Home extends React.Component {

    render() {
        return (
            <div className="home-background">
                <h2 className='ui header'>Home</h2>
            </div>
            // <div style={{ backgroundImage: 'url(./home_background.jpg)', backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100vw`, height: `100vh`, overflow: `hidden`}}>
            // </div>
        )
    }
}

export default Home;