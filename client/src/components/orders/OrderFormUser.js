import React, { Component } from 'react';
import { Form, Button, } from "semantic-ui-react";
import axios from 'axios';
import { AuthConsumer } from '../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';

//orders: current, ticket, order_date, restaurant_id, user_id
//the order_date and restaurant_id are set by the admin- that maps through all the users creating
  //an order for each user (done in adminorderform)
//then each user/admin can go in and edit 'ticket' of the generated order for each user
//will need to get the existing order with date/restaurant_id (this.state)
//then in this form allow the user to edit it.

class OrderFormUser extends Component {
  state = { formValues: { ticket: '', }, };

componentDidMount() {
  const { order: { current, ticket, order_date, restaurant_id, user_id } } = this.props;
  this.setState({ formValues: { ticket }, });
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
  e.preventDefault()
  this.props.editOrder(this.state) //create editOrder function
  this.props.toggleEdit() //create toggleEdit function
  this.setState({
    formValues: {
    ...this.state.formValues,
    ticket: '',
    },
  })
}

//create restriction so edit toggle option where this component displays
  //only appears if user === user.id or user.admin == true.

  editView = () => {
    const { order, auth: { user, }, } = this.props
    const { ticket, } = this.state;

    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Ticket"
            type="text"
            name="ticket"
            value={ticket}
            onChange={this.handleChange}
            required
          />
          <Form.Button type="submit" color="blue">Save</Form.Button>
        </Form>
      )
  }

  render() {
    return(
      <div>
        { this.editView() }
      </div>
    )
  }
}

export class ConnectedOrderFormUser extends React.Component {
  render() {
    return(
      <AuthConsumer>
        { auth =>
            <OrderFormUser {... this.props } {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedOrderFormUser);
