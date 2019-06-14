import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class UserProfile extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <Card>
            <Image src='./john_cho.jpg' wrapped ui={false} />
            <Card.Content>
              <Card.Header>John</Card.Header>
              <Card.Meta>Joined in 2016</Card.Meta>
              <Card.Description>
                CONSISTENCY is the key.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                99,999 Friends
              </a>
            </Card.Content>
          </Card>
        )
    }
}

export default UserProfile;