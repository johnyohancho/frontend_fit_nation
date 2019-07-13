import React from 'react';
import { connect } from 'react-redux';
import { Statistic, Segment } from 'semantic-ui-react';


const UserStat = (props) => {
    return (
        <Segment inverted>
            <Statistic.Group widths={1}>
                <Statistic size='small' color='blue' inverted>
                    <Statistic.Value>{props.userData.set_calories ? props.userData.set_calories : '-'}</Statistic.Value>
                    <Statistic.Label>Calories</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <Statistic.Group size='mini' widths={3}>
                <Statistic color='red' inverted>
                    <Statistic.Value>{props.userData.set_protein ? props.userData.set_protein : '-'}</Statistic.Value>
                    <Statistic.Label>Protein</Statistic.Label>
                </Statistic>
                <Statistic color='orange' inverted>
                    <Statistic.Value>{props.userData.set_carbs ? props.userData.set_carbs : '-'}</Statistic.Value>
                    <Statistic.Label>Carbs</Statistic.Label>
                </Statistic>
                <Statistic color='yellow' inverted>
                    <Statistic.Value>{props.userData.set_fat ? props.userData.set_fat : '-'}</Statistic.Value>
                    <Statistic.Label>Fat</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </Segment>
    )

}

let mapStateToProps = (state) => {
    let userData = state.session_reducer.userData
  
    return {
      userData: userData
    }
}

export default connect(mapStateToProps)(UserStat);