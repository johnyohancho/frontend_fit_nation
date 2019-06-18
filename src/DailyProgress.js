import React from 'react';
import { Grid } from 'semantic-ui-react';
import Macros from './Macros';
import Calories from './Calories';


class DailyProgress extends React.Component {

    constructor() {
        super();
    }


    render() {
        return (
            <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column width={5}>
                <Calories />
              </Grid.Column>
              <Grid.Column width={11}>
                <Macros />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
    }
}

export default DailyProgress;