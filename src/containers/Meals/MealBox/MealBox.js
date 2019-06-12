import React from 'react';

const MealBox = (props) => {
    if (props.meal === null) {
        return (
            <tr className="">
                <th className="">-</th>
                <th className="">-</th>
                <th className="">-</th>
                <th className="">-</th>
            </tr>
        )
    } else {
        return (
            <tr className="">
                <th className="">{props.meal.name}</th>
                <th className="">{props.meal.date}</th>
                <th className="">{props.meal.time}</th>
                <th className="">{props.meal.calories}</th>
            </tr>
        )
    };
}

export default MealBox;