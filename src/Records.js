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
                <th className="">-</th>
            </tr>
        )
    } else if (props.category === 'Meal'){
        return (
            <tr className="">
                <th className="">{props.record.name}</th>
                <th className="">{props.record.date}</th>
                <th className="">{props.record.time}</th>
                <th className="">{props.record.calories}</th>
                <th className="">
                    <i aria-hidden="true" className="delete link icon" onClick={(e) => props.deleteRecord(e, props.record, props.category )}></i>
                </th>
            </tr>
        )
    } else {
        return (
            <tr className="">
                <th className="">{props.record.name}</th>
                <th className="">{props.record.date}</th>
                <th className="">{props.record.sets}</th>
                <th className="">{props.record.reps}</th>
                <th className="">
                    <i aria-hidden="true" className="delete link icon" onClick={(e)=> props.deleteRecord(e, props.record, props.category )}></i>
                </th>
            </tr>
        )
    };
}

export default Records;