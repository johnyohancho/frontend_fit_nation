import React from 'react';
// import { Icon } from 'semantic-ui-react';

const Records = (props) => {
    if (props.record === null) {
        return (
            <tr className="">
                <th className="">-</th>
                <th className="">-</th>
                <th className="">-</th>
                <th className="">-</th>
            </tr>
        )
    } else if (props.category === 'meal'){
        return (
            <tr className="">
                <th className="">{props.record.name}</th>
                <th className="">{props.record.date}</th>
                <th className="">{props.record.time}</th>
                <th className="">{props.record.calories}</th>
            </tr>
        )
    } else {
        return (
            <tr className="">
                <th className="">{props.record.name}</th>
                <th className="">{props.record.date}</th>
                <th className="">{props.record.sets}</th>
                <th className="">{props.record.reps}</th>
                <i aria-hidden="true" class="delete link icon" onClick={(e)=> props.deleteRecord(e)}></i>
            </tr>
        )
    };
}

export default Records;