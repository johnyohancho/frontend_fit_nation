import React from 'react';
import HistoryProgress from './HistoryProgress';
import './css/HistoryContainer.css';
import { Segment, Grid } from 'semantic-ui-react';

const HistoryContainer = () => {
    return (
        <Grid id='historycontainer'>
            <Segment id='history-chart'>
                <HistoryProgress />
            </Segment>
        </Grid>
    )
}

export default HistoryContainer;