import React from "react";
import { Form, Header } from "semantic-ui-react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import { withRouter, } from 'react-router-dom';

class RestaurantForm extends React.Component {
  state = {
    name: "",
    address: "",
    phone: "",
    menu: "",
  };

  componentDidMount() {
    if (this.props.id) {
      const { name, address, phone, menu, id} = this.props
      this.setState({ name, phone, address, menu, id })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.id) {
      this.props.editRestaurant(this.state)
      this.props.toggleEdit()
    } else {
      this.props.addRestaurant(this.state)
    }
    this.setState({ name: '', address: '', phone: '', menu: '', })
  }

  adminDisplay = () => {
    const { auth: { user, } } = this.props
    const { name, address, phone, menu } = this.state;

    if (user.admin === true) {
      return (
      <>
        <Header as='h1'>Add a New Restaurant:</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            placeholder="Address"
            type="text"
            name="address"
            value={address}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            placeholder="Phone"
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            placeholder="Menu"
            type="text"
            name="menu"
            value={menu}
            onChange={this.handleChange}
            required
          />
          <Form.Button type="submit" color="blue">Save</Form.Button>
        </Form>
      </>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        { this.adminDisplay() }
      </div>
    )
  }
}

export class ConnectedRestaurantForm extends React.Component {
  render() {
    return(
      <AuthConsumer>
        { auth =>
            <RestaurantForm {... this.props } {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedRestaurantForm);
