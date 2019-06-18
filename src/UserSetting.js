import React from 'react';
import { connect } from 'react-redux';
import { Segment, Card, Modal, Feed, Icon } from 'semantic-ui-react';

class UserSetting extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <Segment>
                <Modal.Header>Goal Settings</Modal.Header>
                <Modal.Content>
                        <Feed>
                            <Feed.Event>
                                <Icon name='fire' size='small' />
                                <Feed.Content>
                                    <Feed.Date content='Calories' />
                                    <Feed.Summary>
                                    {/* {this.props.userData.user_setting ? 
                                    `${this.props.userData.user_setting.set_calories} kcal`
                                    :
                                    null
                                    } */}
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                </Modal.Content>
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