import React, { Fragment, Component } from 'react';
import { AuthConsumer, } from '../../providers/AuthProvider';
import { Form, Grid, Image, Container, Divider, Header, Button, Segment } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class MyProfile extends Component {
  state = { editing: false, formValues: { first_name: '', last_Name: '', email: '', group: '', allergies: '', exceptions: '', admin: '', file: '', }, };

  componentDidMount() {
    const { auth: { user: { first_name, last_name, email, group, allergies, exceptions, admin, }, }, } = this.props;
    this.setState({ formValues: { first_name, last_name, email, group, allergies, exceptions, admin, }, });
  }

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0] } })
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  handleChange = (e, {name, value}) => {
    // const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { first_name, last_name, email, group, allergies, exceptions, admin, file }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { first_name, last_name, email, group, allergies, exceptions, admin, file });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }

  profileView = () => {
    const { auth: { user }, } = this.props;
    const is_admin = String(user.admin)
    return (
      <Fragment>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h2"
            content='Name:'
            subheader={user.first_name + ' ' + user.last_name}
            />
            <Header as="h2"
            content='Email:'
            subheader={user.email} />
            <Header as="h2"
            content='Group:'
            subheader={user.group} />
            <Header as="h2"
            content='Allergies:'
            subheader={user.allergies} />
            <Header as="h2"
            content='Preferences:'
            subheader={user.exceptions} />
            <Header as="h2"
            content='Administrator:'
            subheader={is_admin}
            />

        </Grid.Column>
      </Fragment>
    )
  }

  editView = () => {
    //const { auth: { user }, } = this.props;
    const { formValues: { first_name, last_name, email, group, allergies, exceptions, file } } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return(
              <div
                {...getRootProps()}
                style={styles.dropzone}
              >
                <input {...getInputProps()}/>
                {
                  isDragActive ?
                    <p>Drop Profile Picture here...</p>
                    :
                    <p>Try dropping a Profile Picture here, or click to select a file to upload </p>
                }
              </div>
            )
          }}
        </Dropzone>
        <br />
        <Form.Input
            label="First Name"
            required
            name='first_name'
            value={first_name}
            placeholder='First Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Last Name"
            required
            name='last_name'
            value={last_name}
            placeholder='Last Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            required
            autoFocus
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
           <Form.Select
            required
            label='Select Group'
            placeholder='Group'
            fluid
            selection
            name='group'
            value={group}
            onChange={this.handleChange}
            options={groupOptions}
            />
            <Form.TextArea
            label='Do you have any allergies?'
            name='allergies'
            value={allergies}
            onChange={this.handleChange}
            />
            <Form.TextArea
            label='Any foods you dislike?'
            name='exceptions'
            value={exceptions}
            onChange={this.handleChange}
            />


          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
    )
  }

  adminCheck = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { admin, } } = this.state;

    if (user.admin === true) {
      return(
        <>
          { this.editView() }
          <Form onSubmit={this.handleSubmit}>
            <Form.Select
             required
             label='Role'
             placeholder=''
             fluid
             selection
             name='admin'
             value={admin}
             onChange={this.handleChange}
             options={adminOptions}
             />
          </Form>
          <Segment textAlign='center' basic>
            <Button type='submit' color='yellow'>Change Administrator Status</Button>
          </Segment>
        </>
      )
    } else {
      return (
        <div>
          { this.editView() }
        </div>
      )
    }
  }

  render() {
    const { editing, } = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            { editing ? this.adminCheck() : this.profileView()}
            <Grid.Column>
              <Button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
      </Container>
    )
  }
}

const groupOptions = [
  {
    key: 'f',
    text: 'Full-Time Crew',
    value: 'Full-Time Crew',

  },

  {
    key: 'a',
    text: 'After-Hours Crew',
    value: 'After-Hours Crew',

  },

]

const adminOptions = [
  {
    key: 't',
    text: 'Administrator',
    value: true,
  },
  {
    key: 'f',
    text: 'Not Administrator',
    value: false,
  },
]

const styles={
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth =>
      <MyProfile { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile;
