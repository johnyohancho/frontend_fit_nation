import React from 'react';
import { Progress, Segment } from 'semantic-ui-react';


const DailyProgress = (props) => {

    return (
        <Segment inverted>
            <Progress percent={32} inverted color='red' progress />
            <Progress percent={59} inverted color='orange' progress />
            <Progress percent={13} inverted color='yellow' progress />
            <Progress percent={37} inverted color='olive' progress />
            <Progress percent={83} inverted color='green' progress />
            <Progress percent={23} inverted color='teal' progress />
            <Progress percent={85} inverted color='blue' progress />
            <Progress percent={38} inverted color='violet' progress />
      </Segment>
    )
}

export default DailyProgress;