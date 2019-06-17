import React from 'react';
import { Segment, Card, Form, Icon, Button, Checkbox, Header, Image, Modal } from 'semantic-ui-react'

class EditUserForm extends React.Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <Segment>
                <Header>Update Profile</Header>
                    <Modal.Content image>
                        <Image wrapped size='small' src='./john_cho.jpg' />
                    </Modal.Content>
                    <Card>
                        <Card.Content>
                            <Card.Header>Description</Card.Header>
                                <Card.Description>
                                    CONSISTENCY is the key.
                                </Card.Description>
                        </Card.Content>
                    </Card>
                    <Form onSubmit={() => this.handleSubmit}>
                        <Form.Field>
                            <label>First Name</label>
                            <input type='text' placeholder='First Name' name='first_name'
                            onChange={(e) => this.setState({ first_name: e.target.value })}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input type='text' placeholder='Last Name' name='last_name'
                            onChange={(e) => this.setState({ last_name: e.target.value })}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input type='text' placeholder='Email' name='email'
                            onChange={(e) => this.setState({ email: e.target.value })}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input type='password' placeholder='Password' name='password'
                            onChange={(e) => this.setState({ password: e.target.value })}/>
                        </Form.Field>
                            <Button type='submit'>Submit</Button>
                    </Form>
          </Segment>
        )
    }
}

export default EditUserForm;

  // <Modal trigger={<Button>Show Modal</Button>}>
  //   <Modal.Header>Select a Photo</Modal.Header>
  //   <Modal.Content image>
  //     <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
  //     <Modal.Description>
  //       <Header>Default Profile Image</Header>
  //       <p>We've found the following gravatar image associated with your e-mail address.</p>
  //       <p>Is it okay to use this photo?</p>
  //     </Modal.Description>
  //   </Modal.Content>
  // </Modal>