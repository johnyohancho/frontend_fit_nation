import React from 'react';
import DailyProgress from './DailyProgress';
import HistoryProgress from './HistoryProgress';
import UserProfile from './UserProfile';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Segment, Button, Modal } from 'semantic-ui-react';
import UserSetting from './UserSetting';
import UserStat from './UserStat';
import { calcMacroData, calcCaloriesData, formatDate } from './Calculations';
import './css/MainContainer.css';


class MainContainer extends React.Component {

    constructor() {
        super()
        this.state = {
            errors: []
        }
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    userSettingOpen = () => this.props.dispatch({ type: "USER_SETTING_MODAL" })

    userSettingClose = () => this.props.dispatch({ type: "USER_SETTING_MODAL" })

    componentDidMount() {
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            console.log("data returned from getUserData()", data)
            console.log("data.meals before getting filtered", data.meals)
            let dateNow = new Date(this.props.currentDate)
            console.log("this.props.currentDate", new Date(this.props.currentDate))
            console.log("formatDate(meal.date)", new Date(formatDate("2019-08-10")))
            data.meals = data.meals.filter(meal => new Date(formatDate(meal.date)) >= dateNow )
            console.log("filtered meals data", data.meals)
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })
            this.props.dispatch({ type: "GET_MACRO_DATA", data: calcMacroData(data) })
            this.props.dispatch({ type: "GET_CALORIES_DATA", data: calcCaloriesData(data) })
            }
        )
    }

    render() {
        return (
            <div id='dashboard' className='ui divided two column grid'>
                <div className='stretched row'>
                    <div className='three wide column'>
                        <div className='ui segment'>
                            <Segment raised>
                                <Modal trigger={
                                    <Button secondary fluid animated='fade' onClick={this.userSettingOpen}>
                                        <Button.Content visible>Set Your Goals</Button.Content>
                                        <Button.Content hidden>Click!</Button.Content>
                                        </Button>}
                                        open={this.props.userSettingModal}
                                        onClose={this.userSettingClose}
                                >
                                        <UserSetting updateMainContainer={this.updateMainContainer}/>
                                </Modal>
                            </Segment>
                            <UserProfile />
                        </div>
                    </div>
                    <div className='thirteen wide column'>
                        <Segment>
                            <Segment raised>
                                <UserStat />
                            </Segment>
                            <Segment raised>
                                <DailyProgress />
                            </Segment>
                        </Segment>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentDate: state.session_reducer.currentDate,
        userSettingModal: state.session_reducer.userSettingModal
    }
}



export default connect(mapStateToProps)(MainContainer);