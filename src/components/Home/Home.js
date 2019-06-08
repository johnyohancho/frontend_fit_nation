import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div style={{ backgroundImage: 'url(./home_background.jpg)', backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100vw`, height: `100vh`, overflow: `hidden`}}>
            <h2 className='ui header'>Home</h2>
            {/* <img src='fitness_wallpaper.jpg' alt='oops'></img> */}
        </div>
    )
}

export default Home;