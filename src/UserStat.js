import React from 'react';
import { connect } from 'react-redux';
import { Statistic, Segment, Card, Feed, Icon, Image, Button, Modal } from 'semantic-ui-react';


const UserStat = (props) => {
    return (
        <Segment inverted>
            <Statistic.Group widths={1}>
                <Statistic size='small' color='blue' inverted>
                    <Statistic.Value>{props.userData.user_setting ? props.userData.user_setting.set_calories : '-'}</Statistic.Value>
                    <Statistic.Label>Calories</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <Statistic.Group size='mini' widths={3}>
                <Statistic color='red' inverted>
                    <Statistic.Value>{props.userData.user_setting ? props.userData.user_setting.set_protein_amount : '-'}</Statistic.Value>
                    <Statistic.Label>Protein</Statistic.Label>
                </Statistic>
                <Statistic color='orange' inverted>
                    <Statistic.Value>{props.userData.user_setting ? props.userData.user_setting.set_carb_amount : '-'}</Statistic.Value>
                    <Statistic.Label>Carbs</Statistic.Label>
                </Statistic>
                <Statistic color='yellow' inverted>
                    <Statistic.Value>{props.userData.user_setting ? props.userData.user_setting.set_fat_amount : '-'}</Statistic.Value>
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