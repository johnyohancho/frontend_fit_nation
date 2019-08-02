import React from 'react';
import EditUserForm from './EditUserForm';
import { connect } from 'react-redux';
import { Segment, Card, Container, Icon, Image, Button, Modal } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import UserAvatar from './UserAvatar';
import { deleteUser } from './ApiCalls';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {

  constructor() {
    super()
    const src = './johncho.jpg'
    this.state = {
      user_id: null,
      open: false,
      openImage: false, 
      imageUpload: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    
    this.setState({
        user_id: decoded.user_id
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpenImage = () => {
    this.setState({ openImage: true })
  }

  handleCloseImage = () => {
    this.setState({ openImage: false })
  }

  handleDelete = () => {
    deleteUser(this.state.user_id)
    .then(this.props.dispatch({type: "USER_LOGOUT"}))
    .then(this.handleClose())
  }

  render() {
    return (
      <Segment>
        <Container>
          <Card>
            <Modal
              trigger={<Image src='./john_cho.jpg' wrapped ui={true} onClick={this.handleOpenImage} />}
              open={this.state.openImage}
              onClose={this.handleCloseImage}
            >
              <UserAvatar />
            </Modal>
            <Card.Content>
              <Card.Header>{this.props.userData.name}</Card.Header>
              <Card.Meta>Joined in 2019</Card.Meta>
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
                  <EditUserForm close={() => this.handleClose()}/>
                </Modal>

                <Modal
                  trigger={<Button basic color='red' onClick={this.handleOpen}>Delete</Button>}
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <Modal.Header>Delete Your Account</Modal.Header>
                  <Modal.Content>
                    <p>Are you sure you want to delete your account?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button 
                      onClick={this.handleClose}
                      negative
                      content='No'
                      >
                    </Button>
                    <Link to='/'>
                      <Button
                        onClick={this.handleDelete}
                        positive
                        content='Yes'
                      />
                    </Link>
                  </Modal.Actions>
                </Modal>
              </div>
            </Card.Content>
          </Card>
        </Container>
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