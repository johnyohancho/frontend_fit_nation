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

export function getMacroData(data) {
    let pCap = data.set_protein
    let pTotal = 0
    let pConsume = 0
    let pRemain = 0
    let pExceed = 0

    let cCap = data.set_carbs
    let cTotal = 0
    let cConsume = 0
    let cRemain = 0
    let cExceed = 0

    let fCap = data.set_fat
    let fTotal = 0
    let fConsume = 0
    let fRemain = 0
    let fExceed = 0

    data.meals.map(meal => {
        let p = meal.protein
        let c = meal.carbs
        let f = meal.fat

        pTotal += p
        cTotal += c
        fTotal += f
    })

    if (pTotal >= pCap) {
        pRemain = 0
        pConsume = pCap
        pExceed = pTotal - pCap
    } else {
        pConsume = pTotal
        pRemain = pCap - pTotal
        pExceed = 0
    };


    if (cTotal >= cCap) {
        cRemain = 0
        cConsume = cCap
        cExceed = cTotal - cCap
    } else {
        cConsume = cTotal
        cRemain = cCap - cTotal
        cExceed = 0
    };


    if (fTotal >= fCap) {
        fRemain = 0
        fConsume = fCap
        fExceed = fTotal - fCap
    } else {
        fConsume = fTotal
        fRemain = fCap - fTotal
        fExceed = 0
    };

    let seriesData = [{name: "Consumed (g)", data: [ pConsume, cConsume, fConsume ] },{name: "Remaining (g)", data: [ pRemain, cRemain, fRemain ] },{name: "Exceeded (g)", data: [ pExceed, cExceed, fExceed ] }]
    return seriesData

}

export function getCaloriesData(data) {
    let target = data.set_calories
    let currentCount = 0
    let exceeded = 0
    let currentPercent = 0
    let exceedPercent = 0

    data.meals.map(meal => {
        currentCount += meal.calories
    })

    if (target === null || target === 0) {
        currentPercent = 0
        exceedPercent = 0
    } else if (currentCount > target) {
        exceeded = currentCount - target
        currentPercent = 100
        exceedPercent = Math.round(exceeded/target * 100)
    } else {
        currentPercent = Math.round(currentCount/target * 100)
        exceedPercent = 0
    };

    let seriesData = [currentPercent, exceedPercent]

    return seriesData
}

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

    // export function getMacroData(data) {
    //         let pCap = data.set_protein
    //         let pTotal = 0
    //         let pConsume = 0
    //         let pRemain = 0
    //         let pExceed = 0
    
    //         let cCap = data.set_carbs
    //         let cTotal = 0
    //         let cConsume = 0
    //         let cRemain = 0
    //         let cExceed = 0
    
    //         let fCap = data.set_fat
    //         let fTotal = 0
    //         let fConsume = 0
    //         let fRemain = 0
    //         let fExceed = 0
    
    //         data.meals.map(meal => {
    //             let p = meal.protein
    //             let c = meal.carbs
    //             let f = meal.fat
    
    //             pTotal += p
    //             cTotal += c
    //             fTotal += f
    //         })
    
    //         if (pTotal >= pCap) {
    //             pRemain = 0
    //             pConsume = pCap
    //             pExceed = pTotal - pCap
    //         } else {
    //             pConsume = pTotal
    //             pRemain = pCap - pTotal
    //             pExceed = 0
    //         };
    
    
    //         if (cTotal >= cCap) {
    //             cRemain = 0
    //             cConsume = cCap
    //             cExceed = cTotal - cCap
    //         } else {
    //             cConsume = cTotal
    //             cRemain = cCap - cTotal
    //             cExceed = 0
    //         };
    
    
    //         if (fTotal >= fCap) {
    //             fRemain = 0
    //             fConsume = fCap
    //             fExceed = fTotal - fCap
    //         } else {
    //             fConsume = fTotal
    //             fRemain = fCap - fTotal
    //             fExceed = 0
    //         };
    
    //         let seriesData = [{name: "Consumed (g)", data: [ pConsume, cConsume, fConsume ] },{name: "Remaining (g)", data: [ pRemain, cRemain, fRemain ] },{name: "Exceeded (g)", data: [ pExceed, cExceed, fExceed ] }]
    //         return seriesData

    // }

    // getCaloriesData(data) {
    //         let target = data.set_calories
    //         let currentCount = 0
    //         let exceeded = 0
    //         let currentPercent = 0
    //         let exceedPercent = 0
    
    //         data.meals.map(meal => {
    //             currentCount += meal.calories
    //         })
    
    //         if (target === null || target === 0) {
    //             currentPercent = 0
    //             exceedPercent = 0
    //         } else if (currentCount > target) {
    //             exceeded = currentCount - target
    //             currentPercent = 100
    //             exceedPercent = Math.round(exceeded/target * 100)
    //         } else {
    //             currentPercent = Math.round(currentCount/target * 100)
    //             exceedPercent = 0
    //         };
    
    //         let seriesData = [currentPercent, exceedPercent]
    
    //         return seriesData
    // }

    userSettingOpen = () => this.props.dispatch({ type: "USER_SETTING_MODAL" })

    userSettingClose = () => this.props.dispatch({ type: "USER_SETTING_MODAL" })

    componentDidMount() {
        console.log("main container rendered")
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })
            this.props.dispatch({ type: "GET_MACRO_DATA", data: getMacroData(data) })
            this.props.dispatch({ type: "GET_CALORIES_DATA", data: getCaloriesData(data) })
            }
        )
    }

    render() {
        return (
            <div className='ui divided two column grid'>
                <div className='stretched row'>
                    <div className='three wide column'>
                        <div className='ui segment'>
                            <h3 className='ui header'>Profile</h3>
                            <UserProfile />
                            <Segment>
                                <Modal trigger={
                                        <Button fluid animated='fade' onClick={this.userSettingOpen}>
                                        <Button.Content visible>Set Your Goals</Button.Content>
                                        <Button.Content hidden>Click!</Button.Content>
                                        </Button>}
                                        open={this.props.userSettingModal}
                                        onClose={this.userSettingClose}
                                >
                                        <UserSetting updateMainContainer={this.updateMainContainer}/>
                                </Modal>
                                <UserStat />
                            </Segment>
                        </div>
                    </div>
                    <div className='thirteen wide column'>
                        <div className='ui segment'>
                            <h3 className='ui header'>Daily Progress - {this.props.currentDate}</h3>
                            <DailyProgress />
                        </div>
                        <div className='ui segment'>
                            <h3 className='ui header'>History Progress (Coming soon...)</h3>
                                <HistoryProgress />
                        </div>
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