import React from 'react';
import DailyProgress from './DailyProgress';
import HistoryProgress from './HistoryProgress';
import UserProfile from './UserProfile';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Statistic, Segment, Card, Feed, Icon, Image, Button, Modal } from 'semantic-ui-react';
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

    getMacroData(data) {
        console.log()
        let pCap = data.user_setting.set_protein_amount
        let pTotal = 0
        let pConsume = 0
        let pRemain = 0
        let pExceed = 0

        let cCap = data.user_setting.set_carb_amount
        let cTotal = 0
        let cConsume = 0
        let cRemain = 0
        let cExceed = 0

        let fCap = data.user_setting.set_fat_amount
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

        let pDiff = pCap - pTotal

        if (pDiff <= 0) {
            pRemain = 0
            pConsume = pTotal - pCap
            pExceed = Math.abs(pTotal - pCap)
        } else {
            pConsume = pTotal
            pRemain = Math.abs(pDiff)
            pExceed = 0
        };

        
        let cDiff = cCap - cTotal

        if (cDiff <= 0) {
            cRemain = 0
            cConsume = cTotal - cCap
            cExceed = Math.abs(cTotal - cCap)
        } else {
            cConsume = cTotal
            cRemain = Math.abs(cDiff)
            cExceed = 0
        };


        let fDiff = fCap - fTotal
        if (fDiff <= 0) {
            fRemain = 0
            fConsume = fTotal - fCap
            fExceed = Math.abs(fTotal - fCap)
        } else {
            fConsume = fTotal
            fRemain = Math.abs(fDiff)
            fExceed = 0
        };

        let seriesData = [{name: "Consumed (g)", data: [ pConsume, cConsume, fConsume ] },{name: "Remaining (g)", data: [ pRemain, cRemain, fRemain ] },{name: "Exceeded (g)", data: [ pExceed, cExceed, fExceed ] }]

        return seriesData
    }

    componentDidMount() {
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })

            this.props.dispatch({ type: "GET_MACRO_DATA", data: this.getMacroData(data) })
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
                            <Segment inverted>
                                    <Statistic size='small' color='blue' inverted>
                                        <Statistic.Value>1850kcal</Statistic.Value>
                                        <Statistic.Label>Calories</Statistic.Label>
                                    </Statistic>
                                <Statistic.Group size='mini'>
                                    <Statistic color='red' inverted>
                                        <Statistic.Value>100g</Statistic.Value>
                                        <Statistic.Label>Protein</Statistic.Label>
                                    </Statistic>
                                    <Statistic color='orange' inverted>
                                        <Statistic.Value>100g</Statistic.Value>
                                        <Statistic.Label>Carbs</Statistic.Label>
                                    </Statistic>
                                    <Statistic color='yellow' inverted>
                                        <Statistic.Value>100g</Statistic.Value>
                                        <Statistic.Label>Fat</Statistic.Label>
                                    </Statistic>
                                </Statistic.Group>
                            </Segment>
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

let mapStateToProps = (state) => {
    return {
        macroState: state.session_reducer.macroState
    }
}



export default connect(mapStateToProps)(MainContainer);