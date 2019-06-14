import React from 'react';

const ResultCard = (props) => {


    return (
        <div className='ui card' onClick={null}>
            <div className='ui content'>
                <div className='header'>{props.result.food.label}</div>
                <div className='meta'><strong>Weight: </strong>100g</div>
                <div className='meta'><strong>Calories: </strong>
                {
                    props.result.food.nutrients.ENERC_KCAL ?
                    Math.round(props.result.food.nutrients.ENERC_KCAL)
                    :
                    '-'
                }
                </div>
                <div className='meta'><strong>Carbs: </strong>
                {
                    props.result.food.nutrients.CHOCDF ?
                    Math.round(props.result.food.nutrients.CHOCDF)
                    :
                    '-'
                }
                </div>
                <div className='meta'><strong>Protein: </strong>
                {
                    props.result.food.nutrients.PROCNT ?
                    Math.round(props.result.food.nutrients.PROCNT)
                    :
                    '-'
                }
                </div>
                <div className='meta'><strong>Fat: </strong>
                {
                    props.result.food.nutrients.FAT ?
                    Math.round(props.result.food.nutrients.FAT)
                    :
                    '-'
                }
                </div>
            </div>
        </div>
    )
}

export default ResultCard;