import React, { Component } from 'react';
import { Form, Button, Icon, Grid } from "semantic-ui-react";
import axios from 'axios';
import { AuthConsumer } from '../../providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import './OrderFormUser.css'

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
    r.user_id === user_id
  )
  }

  clearOrder = () => {
    const { user } = this.props.auth
    // this.props.updateTicket('', this.props.id, this.props.user_id)
    if(user.admin === true) {
      const response = this.setOrderValue()
      this.props.updateTicket('', response.id, this.state.user_id)
    } else {
    this.props.updateTicket('', this.props.id, this.props.user_id)
    }
  }
  absentOrder = () => {
    const { user } = this.props.auth
    // this.props.updateTicket('N/A', this.props.id, this.props.user_id)
    if(user.admin === true) {
      const response = this.setOrderValue()
      this.props.updateTicket('N/A', response.id, this.state.user_id)
    } else {
    this.props.updateTicket('N/A', this.props.id, this.props.user_id)
    }
  }
handleChange = (e, {name, value}) => {
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


  editView = () => {
    const { ticket, users, userData } = this.state;

    const { user } = this.props.auth

    if(user.admin === true) {
      return (
        <>
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
            placeholder="Your Order"
            type="text"
            name="ticket"
            value={ticket}
            onChange={this.handleChange}
          />
          <Form.Button type="submit" style={{backgroundColor: "#0f4c5c", color: "white", width: "100%" }}>Submit Order</Form.Button>
          <Grid>
            <Grid.Column width={8}>
              <Button
              icon
              onClick={ () => this.clearOrder() }
              animated='vertical'
              style={{ width: "100%", backgroundColor: "lightgrey", color:"#ff6e00" }}
            >
            <Button.Content  hidden>Clear</Button.Content>
            <Button.Content class="buttoncenter" visible><Icon name ="eraser" /></Button.Content>
            </Button>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button
            icon
            color="red"
            onClick={ () => this.absentOrder() }
            animated='vertical'
            style={{  width: "100%",}}
          >
            <Button.Content hidden>Absent</Button.Content>
            <Button.Content visible><Icon name ="calendar times" /></Button.Content>
          </Button>
        </Grid.Column>
        </Grid>
        </Form>
        </>
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
          />
          <Form.Button type="submit" style={{backgroundColor: "#0f4c5c", color: "white" }}>Submit Order</Form.Button>
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
