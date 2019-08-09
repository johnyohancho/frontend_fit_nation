import React from 'react';
import { connect } from 'react-redux';
import { Statistic, Segment, Grid, Icon } from 'semantic-ui-react';


const UserStat = (props) => {
    return (
        <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column width={5}>
                <Statistic horizonal>
                    <Statistic.Value>
                        <Icon name='calendar alternate' />
                        &nbsp;
                        {props.currentDate}
                    </Statistic.Value>
                    {/* <Statistic.Value>{props.currentDate}</Statistic.Value> */}
                </Statistic>
              </Grid.Column>
              <Grid.Column width={11}>
                  <Statistic.Group id='nutrition-stat' widths='four'>
                    <Statistic color='blue'>
                        <Statistic.Value>{props.userData.set_calories ? props.userData.set_calories : '-'}</Statistic.Value>
                        <Statistic.Label>Calories</Statistic.Label>
                    </Statistic>
                    <Statistic color='red'>
                        <Statistic.Value>{props.userData.set_protein ? props.userData.set_protein : '-'}</Statistic.Value>
                        <Statistic.Label>Protein</Statistic.Label>
                    </Statistic>
                    <Statistic color='orange'>
                        <Statistic.Value>{props.userData.set_carbs ? props.userData.set_carbs : '-'}</Statistic.Value>
                        <Statistic.Label>Carbs</Statistic.Label>
                    </Statistic>
                    <Statistic color='yellow'>
                        <Statistic.Value>{props.userData.set_fat ? props.userData.set_fat : '-'}</Statistic.Value>
                        <Statistic.Label>Fat</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
              </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}

let mapStateToProps = (state) => {
    let userData = state.session_reducer.userData
  
    return {
      currentDate: state.session_reducer.currentDate,
      userData: userData
    }
}

export default connect(mapStateToProps)(UserStat);