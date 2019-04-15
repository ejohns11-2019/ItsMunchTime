import React, { Fragment, Component } from 'react';
import { Form, Grid, Image, Container, Divider, Header, Button, Segment, Divider } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import EditProfile from './EditProfile';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends Component {
  state = { editing: false, };
  
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  render(){
    const {editing,} = this.state
    const is_admin = String(this.props.admin)
    return(
      <Container>
        <Grid>
          <Grid.Row>
      <Fragment>
        <Grid.Column width={4}>
          <Image src={this.props.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h2"
            content='Name:'
            subheader={this.props.first_name + ' ' + this.props.last_name}
            />
            <Header as="h2"
            content='Email:'
            subheader={this.props.email} />
            <Header as="h2"
            content='Group:'
            subheader={this.props.group} />
            <Header as="h2"
            content='Allergies:'
            subheader={this.props.allergies} />
            <Header as="h2"
            content='Preferences:'
            subheader={this.props.exceptions} />
            <Header as="h2"
            content='Administrator:'
            subheader={is_admin}
            />

        </Grid.Column>
        <Grid.Column>
          <Button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
          
        </Grid.Column>
        </Fragment>
        </Grid.Row>
        <Grid.Row>
        { editing ? <EditProfile id={this.props.id} {...this.props} /> : null }
        </Grid.Row>
        <Divider />
        </Grid>
        </Container>
    )
  }
}



export default Profile;