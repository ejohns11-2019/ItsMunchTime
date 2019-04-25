import React, { Fragment, Component } from 'react';
import { Grid, Image, Container, Divider, Header, Button, Icon, } from 'semantic-ui-react';
//import Dropzone from 'react-dropzone';
import EditProfile from './EditProfile';
import { AuthConsumer, } from '../../providers/AuthProvider';


const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class UserProfile extends Component {
  state = { editing: false, };

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  render(){
    const {editing,} = this.state
    const is_admin = String(this.props.admin)
    const { auth: { deleteUser, }, } = this.props;
    return(
      <Container >
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
          <Button
          icon
          style={{backgroundColor: "#0f4c5c", color: "white" }}
          size="tiny"
          onClick={this.toggleEdit}
        >
          { this.state.editing ? 'Cancel'
          :
          <Icon name="pencil"  />
          }
        </Button>
        <Button
          icon
          color="red"
          size="tiny"
          onClick={ () => deleteUser(this.props.id, this.props.u) }
          style={{ marginTop: "15px", }}
        >
          <Icon name ="trash" />
        </Button>
        </Grid.Column>
        </Fragment>
        </Grid.Row>
        <Grid.Row>
        { editing ? <EditProfile id={this.props.id} {...this.props} toggleEdit={this.toggleEdit}  /> : null }
        </Grid.Row>
        <Divider />
        </Grid>
        </Container>
    )
  }
}


const ConnectedUserProfile = (props) => (
  <AuthConsumer>
    { auth =>
      <UserProfile { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedUserProfile;
// export default UserProfile;
