import React from 'react';
import HistoryProgress from './HistoryProgress';
import { Segment } from 'semantic-ui-react';

const HistoryContainer = () => {
    return (
        <Segment >
            <HistoryProgress />
            <HistoryProgress />
        </Segment>
    )
}

export default HistoryContainer;