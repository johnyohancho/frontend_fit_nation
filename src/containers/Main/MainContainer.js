import React from 'react';


const MainContainer = () => {
    return (
        <div style={{ backgroundImage: 'home_background.jpeg', backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: `center`, width: `100%`, height: `100%`, overflow: `hidden`}}>
            <h2 className='ui header'>Main</h2>
            {/* <img src='fitness_wallpaper.jpg' alt='oops'></img> */}
        </div>
    )
}

export default MainContainer;