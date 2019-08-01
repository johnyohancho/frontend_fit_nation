import React from 'react';
import jwt_decode from 'jwt-decode';
import { Card, Image, Button, Dropdown, Select, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ResultCard extends React.Component {
    
    constructor() {
        const now = new Date()
        super()
        this.state = {
            user_id: null,
            name: '',
            date: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
            time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
            meal_type: 'Breakfast',
            calories: '',
            weight: '',
            protein: '',
            carbs: '',
            fat: '',
            backSide: false
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        
        this.setState({
            user_id: decoded.user_id
        })
    }

    cardFlip = (data) => {
        console.log("card flip!")
        this.setState({ backSide: !this.state.backSide })
        this.setState({ name: data.label})
        this.setState({ calories: data.nutrients.ENERC_KCAL})
        this.setState({ carbs: Math.round(data.nutrients.CHOCDF) })
        this.setState({ protein: Math.round(data.nutrients.PROCNT) })
        this.setState({ fat: Math.round(data.nutrients.FAT)} )

        console.log("data being fed in",this.state)
    }

    clickAdd = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/meals',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                this.props.dispatch({type: "ADD_MEAL", data: data})
            };
        })

        this.props.dispatch({type: "CLEAR_MODE"})

    }


    render() {
        return (
            <Card onClick={() => this.cardFlip(this.props.result.food)}>
                { this.state.backSide ? 
                <Card.Content>
                <Card.Header>{this.props.result.food.label}</Card.Header>
                <Card.Meta><strong>Weight: </strong>100g</Card.Meta>
                <Card.Meta>
                    <strong>Calories: </strong>
                    {
                        this.props.result.food.nutrients.ENERC_KCAL ?
                        Math.round(this.props.result.food.nutrients.ENERC_KCAL)
                        :
                        '-'
                    }
                </Card.Meta>
                <Card.Meta>
                    <strong>Carbs: </strong>
                    {
                        this.props.result.food.nutrients.CHOCDF ?
                        Math.round(this.props.result.food.nutrients.CHOCDF)
                        :
                        '-'
                    }
                </Card.Meta>
                <Card.Meta>
                    <strong>Protein: </strong>
                    {
                        this.props.result.food.nutrients.PROCNT ?
                        Math.round(this.props.result.food.nutrients.PROCNT)
                        :
                        '-'
                    }
                </Card.Meta>
                <Card.Meta>
                    <strong>Fat: </strong>
                    {
                        this.props.result.food.nutrients.FAT ?
                        Math.round(this.props.result.food.nutrients.FAT)
                        :
                        '-'
                    }
                </Card.Meta>
                <Input type='text' placeholder='Enter Weight' action>
                <input className='ui focus input' type='number' name='weight' placeholder='g'
                            onChange={(e)=> this.setState({ weight: e.target.value })}></input>
                <Select compact options={this.props.types} defaultValue='Breakfast' onChange={(e, data)=> this.setState({ meal_type: data.value })} />
                </Input>
                <Button fluid animated='fade' onClick={this.clickAdd}>
                    <Button.Content visible>Click to Add</Button.Content>
                    <Button.Content hidden>Click!</Button.Content>
                </Button>
                </Card.Content>

                :

                <Card.Content>
                <Card.Header>{this.props.result.food.label}</Card.Header>
                <Image src={this.props.result.food.image ? 
                this.props.result.food.image
                :
                './no-image-available-md.png'
                } wrapped ui={true} />
                <Card.Meta><strong>Weight: </strong>100g</Card.Meta>
                <Card.Meta>
                    <strong>Calories: </strong>
                    {
                        this.props.result.food.nutrients.ENERC_KCAL ?
                        Math.round(this.props.result.food.nutrients.ENERC_KCAL)
                        :
                        '-'
                    }
                </Card.Meta>
                <Card.Meta>
                    <strong>Carbs: </strong>
                    {
                        this.props.result.food.nutrients.CHOCDF ?
                        Math.round(this.props.result.food.nutrients.CHOCDF)
                        :
                        '-'
                    }
                </Card.Meta>
                <Card.Meta>
                    <strong>Protein: </strong>
                    {
                        this.props.result.food.nutrients.PROCNT ?
                        Math.round(this.props.result.food.nutrients.PROCNT)
                        :
                        '-'
                    }
                </Card.Meta>
                <Card.Meta>
                    <strong>Fat: </strong>
                    {
                        this.props.result.food.nutrients.FAT ?
                        Math.round(this.props.result.food.nutrients.FAT)
                        :
                        '-'
                    }
                </Card.Meta>
                </Card.Content>
                }

            </Card>
        )

    }

}

let mapStateToProps = (state) => {
    let mealTypes = state.meal_reducer.meal_types
    return {
        types: mealTypes
    }
}

export default connect(mapStateToProps)(ResultCard);