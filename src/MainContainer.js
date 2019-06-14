import React from 'react';
import DailyProgress from './DailyProgress';
import HistoryProgress from './HistoryProgress';
import UserProfile from './UserProfile';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux'

class MainContainer extends React.Component {

    constructor() {
        super()
        this.state = {
            errors: []
        }
    }


    componentDidMount() {
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })
        }
        )
    }

    render() {
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
}



export default connect()(MainContainer);