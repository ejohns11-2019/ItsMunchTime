import React from 'react';
import { Form, Grid, Image, Container, Divider, Header, Button, Segment } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


class EditProfile extends React.Component {
  state = {formValues: { first_name: '', last_Name: '', email: '', group: '', allergies: '', exceptions: '', admin: '', image: '', },}

  componentDidMount() {
    const { first_name, last_name, email, group, allergies, exceptions, admin } = this.props;
    this.setState({ formValues: { first_name, last_name, email, group, allergies, exceptions, admin }, });
  }
  
  render() {
  const { formValues: { first_name, last_name, email, group, allergies, exceptions, image, } } = this.state;
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
}

export default EditProfile;