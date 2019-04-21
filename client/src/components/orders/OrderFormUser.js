import React, { Component } from 'react';
import { Form, Icon } from "semantic-ui-react";
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
  state = {
    ticket: "",
    id: "",
    current: false,
    user_id: "",
    users: [],
    userData: [],
    orders: []
  };

componentDidMount() {
  //const { order_date, restaurant_id, user_id } = this.props;
  this.setState({...this.props });
  this.getUsers();
  this.getOrders();
}

getUsers = () => {
  axios.get('/api/users')
       .then( res => {
         this.setState({ users: res.data })
         const { users, userData} = this.state
         users.map( r => {
           var temp = userData;
           temp.push({ key: r.id, text: r.first_name + r.last_name, value: r.id})
           this.setState({userData: temp})
       })})
      .catch( err => {
        console.log(err)
      })
    }

getOrders = () => {
  axios.get('/api/current_orders')
  .then( res => {
    this.setState({orders: res.data })
  })
}

setOrderValue = () => {
  const { user_id, orders } = this.state
  return orders.find( r =>
    r.user_id == user_id
  )
  }


handleChange = (e, {name, value}) => {
  // const { name, value } = e.target
  this.setState({ [name]: value, })
}

handleSubmit = (e) => {
  const { user } = this.props.auth
  e.preventDefault()
  if(user.admin === true) {
    const response = this.setOrderValue()
    this.props.updateTicket(this.state.ticket, response.id, this.state.user_id)
  } else {
  this.props.updateTicket(this.state.ticket, this.props.id, this.props.user_id)
}
  this.setState({ ticket: '', id: '', user_id: ''})
  this.props.toggleEdit()
}

//create restriction so edit toggle option where this component displays
  //only appears if user === user.id or user.admin == true.

  editView = () => {
    //const { order, auth: { user, }, } = this.props
    const { ticket, users, userData } = this.state;
    const { user } = this.props.auth
    
    if(user.admin === true) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Dropdown
            label='User:'
            placeholder='Select a User'
            required
            fluid
            search
            selection
            name='user_id'
            value={users.id}
            options={userData}
            onChange={this.handleChange}
          />
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
    } else {
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
          <br />
        </Form>
      )
    }
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
            <OrderFormUser {...this.props } {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedOrderFormUser);
