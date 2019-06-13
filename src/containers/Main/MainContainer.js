import React from 'react';
import DailyProgress from '../../components/DailyProgress/DailyProgress';
import HistoryProgress from '../../components/HistoryProgress/HistoryProgress';
import UserProfile from '../../components/UserProfile/UserProfile';


const MainContainer = () => {
    return (
        <div className='ui divided two column grid'>
            <div className='stretched row'>
                <div className='six wide column'>
                    <div className='ui segment'>
                        <h3 className='ui header'>Profile</h3>
                        <UserProfile />
                    </div>
                </div>
                <div className='ten wide column'>
                    <div className='ui segment'>
                        <h3 className='ui header'>Daily Progress</h3>
                            <DailyProgress />
                    </div>
                    <div className='ui segment'>
                        <h3 className='ui header'>History Progress</h3>
                            <HistoryProgress />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContainer;