import React from 'react';

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
            </tr>
        )
    };
}

export default Records;