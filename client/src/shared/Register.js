import React from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Button, Form, Segment, Header} from 'semantic-ui-react';



class Register extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', first_name: '', last_name: '', group: 'DevPoint Crew', allergies: '', exceptions: '', admin: false};



  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation, first_name, last_name, group, allergies, exceptions, admin } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;

    if (password === passwordConfirmation)
      handleRegister({ email, password, passwordConfirmation, first_name, last_name, group, allergies, exceptions, admin}, history);
    else
      alert('Passwords Do Not Match!')
  }

  handleChange = (e, {name, value}) => {
    // const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  render() {
    const { email, password, passwordConfirmation, first_name, last_name, group, allergies, exceptions, } = this.state;
    
    

    // const allergies = [

    //   { key: 'Eggs', text: 'Eggs', value:{allergies}},
    //   { key: 'Peanuts', text: 'Peanuts', value:{allergies}},
    //   { key: 'Soy', text: 'Soy', value:{allergies}},
    //   { key: 'Wheat', text: 'Wheat', value:{allergies}},
    //   { key: 'Shellfish', text: 'Shellfish', value:{allergies}}
    // ]

    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Input
            label="Password"
            required
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='Password Confirmation'
            type='password'
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
      </Segment>
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



export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register { ...this.props } auth={auth} /> }
      </AuthConsumer>
    )
  }
}