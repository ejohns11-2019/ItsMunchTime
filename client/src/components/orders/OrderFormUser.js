import React, { Component } from 'react';
import { Form, } from "semantic-ui-react";
//import axios from 'axios';
import { AuthConsumer } from '../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';

//orders: current, ticket, order_date, restaurant_id, user_id
//the order_date and restaurant_id are set by the admin- that maps through all the users creating
  //an order for each user (done in adminorderform)
//then each user/admin can go in and edit 'ticket' of the generated order for each user
//will need to get the existing order with date/restaurant_id (this.state)
//then in this form allow the user to edit it.

class OrderFormUser extends Component {
  state = {
    ticket: "",
  };

componentDidMount() {
  const { id, current, ticket, order_date, restaurant_id, user_id } = this.props;
  this.setState({ id, ticket, current, order_date, restaurant_id, user_id, });
}

handleChange = (e) => {
  const { name, value } = e.target
  this.setState({ [name]: value })
}

handleSubmit = (e) => {
  e.preventDefault()
  this.props.editOrder(this.state) 
  this.props.toggleEdit() 
  this.setState({ ticket: '', })
}

//create restriction so edit toggle option where this component displays
  //only appears if user === user.id or user.admin == true.

  editView = () => {
    //const { order, auth: { user, }, } = this.props
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
