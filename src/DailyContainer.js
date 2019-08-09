import React from 'react';
import DailyProgress from './DailyProgress';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { getUserData } from './ApiCalls';
import jwt_decode from 'jwt-decode';
import './css/DailyContainer.css';
import { connect } from 'react-redux';
import { calcMacroData, calcCaloriesData, formatDate } from './Calculations';

class DailyContainer extends React.Component {


    componentDidMount() {
        const userId = jwt_decode(localStorage.getItem('token')).user_id
        getUserData(userId).then((data) => {
            let dateNow = new Date(this.props.currentDate)
            data.meals = data.meals.filter(meal => new Date(formatDate(meal.date)) >= dateNow )
            this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
            this.props.dispatch({ type: "GET_USER_DATA", data: data })
            this.props.dispatch({ type: "GET_MACRO_DATA", data: calcMacroData(data) })
            this.props.dispatch({ type: "GET_CALORIES_DATA", data: calcCaloriesData(data) })
            }
        )
    }

    render() {
        return (
            <Grid id='dailycontainer'>
                <Segment>
                    <Header>Daily Snapshot</Header>
                        <Segment raised>
                            <DailyProgress />
                        </Segment>
                </Segment>
            </Grid>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentDate: state.session_reducer.currentDate
    }
}

export default connect(mapStateToProps)(DailyContainer);