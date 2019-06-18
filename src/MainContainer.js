import React from 'react';
import DailyProgress from './DailyProgress';
import HistoryProgress from './HistoryProgress';
import UserProfile from './UserProfile';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Segment, Card, Feed, Icon, Image, Button, Modal } from 'semantic-ui-react';
import UserSetting from './UserSetting';

class MainContainer extends React.Component {

    constructor() {
        super()
        this.state = {
            errors: []
        }
    }

    currentDate() {
        const now = new Date()
        return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
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
                    <div className='four wide column'>
                        <div className='ui segment'>
                            <h3 className='ui header'>Profile</h3>
                            <UserProfile />
                            <Modal trigger={
                                    <Button fluid animated='fade'>
                                    <Button.Content visible>Set Your Goals</Button.Content>
                                    <Button.Content hidden>Click!</Button.Content>
                                    </Button>}
                            >
                                    <UserSetting />
                            </Modal>
                        </div>
                    </div>
                    <div className='twelve wide column'>
                        <div className='ui segment'>
                            <h3 className='ui header'>Daily Progress - {this.currentDate()}</h3>
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