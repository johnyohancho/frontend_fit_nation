import React from 'react';
import EditUserForm from './EditUserForm';
import { connect } from 'react-redux';
import { Segment, Card, Feed, Icon, Image, Button, Modal } from 'semantic-ui-react'

class UserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      open: false

    }
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
      this.setState({ closeOnEscape, closeOnDimmerClick, open: true})
  }

  close = () => {
    console.log("close called!")
    console.log(this.state.open)
    this.setState({ open: false })
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state
    return (
      <Segment>

          <Card>
          <Image src='./john_cho.jpg' wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.userData.name}</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Meta>{this.props.userData.username}</Card.Meta>
            <Card.Description>
              email: {this.props.userData.email}
            </Card.Description>
            <Card.Description>
              {this.props.userData.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              99,999 Friends
            </a>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Modal trigger={<Button basic color='green'>Edit</Button>} >
                <EditUserForm close={() => this.close()}/>
              </Modal>

              <Button basic color='red' onClick={this.closeConfigShow(false, false)}>Delete</Button>

              <Modal
                open={open}
                closeOnEscape={closeOnEscape}
                closeOnDimmerClick={closeOnDimmerClick}
                onClose={this.close}
              >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                  <p>Are you sure you want to delete your account?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.close} negative>
                    No
                  </Button>
                  <Button
                    onClick={this.close}
                    positive
                    labelPosition='right'
                    icon='checkmark'
                    content='Yes'
                  />
                </Modal.Actions>
              </Modal>
            </div>
          </Card.Content>
        </Card>
      </Segment>
    )
  }
}

let mapStateToProps = (state) => {
  let userData = state.session_reducer.userData

  return {
    userData: userData
  }
}

export default connect(mapStateToProps)(UserProfile);