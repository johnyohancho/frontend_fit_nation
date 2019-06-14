import React from 'react';
import { Progress, Segment, Label } from 'semantic-ui-react';


const DailyProgress = (props) => {

    return (
        <Segment inverted>
            <Progress inverted color='red' progress='ratio' value='960' total='1850'>Calories (kcal)</Progress>
            <Progress inverted color='orange' progress='ratio' value='125' total='180'>Carbs (g)</Progress>
            <Progress inverted color='blue' progress='ratio' value='86' total='140'>Protein (g)</Progress>
            <Progress inverted color='green' progress='ratio' value='23' total='60'>Fat (g)</Progress>
      </Segment>
    )
}

export default DailyProgress;