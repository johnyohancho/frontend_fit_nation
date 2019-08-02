import React from 'react';
import DailyProgress from './DailyProgress';
import { Segment } from 'semantic-ui-react';

const DailyContainer = () => {
    return (
        <Segment>
            <DailyProgress />
        </Segment>
    )
}

export default DailyContainer;