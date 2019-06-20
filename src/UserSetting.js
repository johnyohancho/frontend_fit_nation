import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Container, Segment, Form, Button, Header, Card, Modal, Feed, Icon } from 'semantic-ui-react';

class UserSetting extends React.Component {
    constructor() {
        super()
        this.state = {
            user_id: null,
            set_calories: 0,
            set_protein_amount: 0,
            set_carb_amount: 0,
            set_fat_amount: 0,
            errors: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        
        this.setState({
            user_id: decoded.user_id
        })
    }

    displayErrors = () => {
        if (this.state.errors.length > 0) {
            return (
                <div className="form-errors">
                    <p>Invalid!</p>
                    <ul>
                        {this.state.errors.map(err => <li>{err}</li>)}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }

    handleSettingSubmit = (e) => {
        e.preventDefault()
    
        fetch(`http://localhost:3000/user_settings/${this.state.user_id}`, {
            method: "PATCH",
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
                this.props.dispatch({ type: "UPDATE_USER_SETTING", data: data })
            }; 
        })
    
        e.target.reset()
    }

    render() {
        return (
            <Segment>
                <Modal.Header><Header as='h2' textAlign='center'>Goal Setting</Header></Modal.Header>
                    <Form onSubmit={(e) => this.handleSettingSubmit(e)}>
                            { this.displayErrors() }
                            <Form.Field required>
                                <label>Calories</label>
                                <input type='number' placeholder='Calories (kcal)' name='calories'
                                onChange={(e) => this.setState({ set_calories: e.target.value })}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Protein</label>
                                <input type='number' placeholder='Protein (g)' name='set_protein_amount'
                                onChange={(e) => this.setState({ set_protein_amount: e.target.value })}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Carbs</label>
                                <input type='number' placeholder='Carbs' name='set_carb_amount'
                                onChange={(e) => this.setState({ set_carb_amount: e.target.value })}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Fat</label>
                                <input type='number' placeholder='Fat (g)' name='set_fat_amount'
                                onChange={(e) => this.setState({ set_fat_amount: e.target.value })}/>
                            </Form.Field>
                            <Modal.Actions>
                                <Button type='submit' onClick={null}>Submit</Button>
                            </Modal.Actions>
                    </Form>
            </Segment>

            // <Segment>
            //     <Card>
            //         <Card.Content>
            //             <Feed>
            //             <Feed.Event>
            //                 <Icon name='fire' size='small' />
            //                 <Feed.Content>
            //                     <Feed.Date content='Calories' />
            //                     <Feed.Summary>
            //                     {this.props.userData.user_setting ? 
            //                     `${this.props.userData.user_setting.set_calories} kcal`
            //                     :
            //                     null
            //                     }
            //                     </Feed.Summary>
            //                 </Feed.Content>
            //             </Feed.Event>

            //             <Feed.Event>
            //                 <Icon name='fire' size='mini' />
            //                 <Feed.Content>
            //                 <Feed.Date content='Protein' />
            //                 <Feed.Summary>
            //                     {this.props.userData.user_setting ? 
            //                     `${this.props.userData.user_setting.set_protein_amount}g`
            //                     :
            //                     null
            //                     }
            //                 </Feed.Summary>
            //                 </Feed.Content>
            //             </Feed.Event>

            //             <Feed.Event>
            //                 <Feed.Label image='/images/avatar/small/elliot.jpg' />
            //                 <Feed.Content>
            //                 <Feed.Date content='Carbs' />
            //                 <Feed.Summary>
            //                     {this.props.userData.user_setting ? 
            //                     `${this.props.userData.user_setting.set_carb_amount}g`
            //                     :
            //                     null
            //                     }
            //                 </Feed.Summary>
            //                 </Feed.Content>
            //             </Feed.Event>
            //             </Feed>
            //         </Card.Content>
            //     </Card>
            // </Segment>
        )
    }
}

let mapStateToProps = (state) => {
    let userData = state.session_reducer.userData
  
    return {
      userData: userData
    }
  }

export default connect()(UserSetting);