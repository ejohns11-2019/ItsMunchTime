import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Order from './Order'
import axios from 'axios';
import './orderGroupList.css';
import { AuthConsumer, } from "../../providers/AuthProvider";
import {Grid, Table, Button, Icon } from 'semantic-ui-react';

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component {

  state = { orders: [], unqiueTicket: '', currentUserOrderId: '',  user: { id: '' }, order: { current: '', ticket: '', order_date: '', user_id: '', restaurtant_id: '' } }

  componentDidMount() {
    axios.get('/api/current_orders')
      .then(res => {
        this.setState({ orders: res.data })
        this.props.auth.setRestaurant(res.data[0].restaurant_id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // toggleEdit = () => {
  //   this.setState(state => {
  //     return { editing: !state.editing, };
  //   })
  // }

  toggleReset = () => {
    const { auth: { clearRestaurant }, } = this.props;
    axios.put('/api/current_to_false', { current: false })
      .then(res => {
        this.componentDidMount()

      })
      clearRestaurant()
  }

  updateTicket = (updatedTicket, id, user_id) => {
    const { orders, } = this.state

    orders.map((o) => {
      if (o.user_id === user_id){
        return(
        this.setState({orders: [ {...o}, {ticket: updatedTicket}],})

        )
      }
    })

    axios.put(`/api/orders/${id}`, {ticket: updatedTicket})
      .then(res => {
        this.componentDidMount()
      })
  }

//  getOtherOrder = (id) => {
//    return axios.get(`/api/orders/${id}`)
//  }

// //  getUserOrder = (id) => {
//     return axios.get(`/api/users/${id}/orders`)
// //  }

//  copyOrder = (a,b) => {
//  axios.all([this.getOtherOrder(a), this.getUserOrder(b)])
//     .then(axios.spread(function (otherOrder, userOrder) {
//       axios.put(`/api/orders/${userOrder.data.id}?ticket=${otherOrder.data.ticket}`)
//     }))}

duplicateOrder = (unqiueTicket) => {
  const { auth: { user, } } = this.props

  this.updateTicket(unqiueTicket, this.state.currentUserOrderId, user.id)

}

setCurrentUserOrderId = (currentUserorder) => {
  if(this.state.currentUserOrderId === ""){
    this.setState({currentUserOrderId: currentUserorder.id})
  }
}

  render() {
    const { orders, } = this.state
    const { auth: { user } } = this.props

    return (
      <div className='orders'>
        <Grid> 
          <Grid.Row>
            <Grid.Column width={8}>
              {
                orders.map((o) => {
                  return (
                    <Order key={o.id} {...o} unqiueTicket={this.state.unqiueTicket} user_id={o.user_id} ticket={o.ticket} updateTicket={this.updateTicket} setCurrentUserOrderId={this.setCurrentUserOrderId} />
                  )
                })
              }
            </Grid.Column>
            <Grid.Column width={8}>
              <Table celled color="red">
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Order</Table.HeaderCell>
                    <Table.HeaderCell>“I’ll Order What They Ordered”</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {
                  orders.map((o) => {
                    return (
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>{o.first_name} {o.last_name} </Table.Cell>
                          <Table.Cell>{o.ticket}</Table.Cell>
                          <Table.Cell textAlign='center'><Button unqiueticket={o.ticket} onClick={() => this.duplicateOrder(o.ticket)}><Icon name='food' fitted color='red'/></Button></Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    )
                  })
                }
              </Table>
              <p><strong>Directions:</strong> Once all orders have been placed, administrator can copy & paste orders table in a Word doc. to print orders or screenshot the table to place order directly with restaurant. Once “Archive" is clicked admin will only be able to view orders in [Restaurants > History] (per restaurant) OR [All Users > History] (per user). </p>
              {user.admin && <Button size="medium" color="red" onClick={this.toggleReset}>Done</Button>}
              {user.admin && <Link to='/new_order'>
                <Button size='medium' color='blue'>New Order</Button>
              </Link> }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export class ConnectedOrderList extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth =>
          <OrderList {...this.props} {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedOrderList);
