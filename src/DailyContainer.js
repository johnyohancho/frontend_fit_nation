import React from 'react';
import DailyProgress from './DailyProgress';
import { Segment, Grid } from 'semantic-ui-react';
import './css/DailyContainer.css';

const DailyContainer = () => {
    return (
        <Grid id='dailycontainer'>
            <Segment>
                <DailyProgress />
            </Segment>
        </Grid>
    )
}

export default DailyContainer;