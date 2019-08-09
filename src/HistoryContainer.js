import React from 'react';
import HistoryProgress from './HistoryProgress';
import './css/HistoryContainer.css';
import { Segment, Grid, Header } from 'semantic-ui-react';

const HistoryContainer = () => {
    return (
        <Grid id='historycontainer'>
            <Segment id='history-chart'>
                <Header>Progress</Header>
                    <Segment raised>
                        <HistoryProgress />
                    </Segment>
            </Segment>
        </Grid>
    )
}

export default HistoryContainer;