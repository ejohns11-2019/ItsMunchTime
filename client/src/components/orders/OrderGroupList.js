import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Order from './Order'
import axios from 'axios';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Header, Grid, Table, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import UserProfile from '../profile/UserProfile';
import OrderFormUser from './OrderFormUser';



//Logical component that will handle order display, and all order CRUD actions


class OrderList extends React.Component {

  state = { orders: [], user: { id: '' }, order: { current: '', ticket: '', order_date: '', user_id: '', restaurtant_id: '' } }

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

  toggleEdit = () => {
    this.setState(state => {
      return { editing: !state.editing, };
    })
  }

  toggleReset = () => {
    axios.put('/api/current_to_false', { current: false })
      .then(res => {
        this.componentDidMount() 
        this.props.auth.setRestaurant(null)
      })
  }

  updateTicket = (updatedTicket, id, user_id) => {
    const { orders, } = this.state
    // debugger
    orders.map((o) => {
      if (o.user_id == user_id){
        debugger
        return(
        this.setState({orders: [ {...o}, {ticket: updatedTicket}] })
        )
      }
    })
   
    axios.put(`/api/orders/${id}`, {ticket: updatedTicket})
      .then(res => {
        this.componentDidMount()
      })
  }

  

 getOtherOrder = (id) => {
   return axios.get(`/api/orders/${id}`)
 }

 getUserOrder = (id) => {
    return axios.get(`/api/users/${id}/orders`)
 }

 copyOrder = (a,b) => {
 axios.all([this.getOtherOrder(a), this.getUserOrder(b)])
    .then(axios.spread(function (otherOrder, userOrder) {
      axios.put(`/api/orders/${userOrder.data.id}?ticket=${otherOrder.data.ticket}`)
    }))}

  
  // copyOrder = (id) => {
  //   // debugger
  //   const {user} = this.props.auth
  //   this.getOrders(user.id)
  //   axios.get(`/api/orders/${id}`)
  //     .then(res => {
  //       const {order } = this.state
  //       debugger
  //       axios.put(`/api/orders/${order.id}?ticket=${res.data.ticket}`)
  //         .then( res => {
  //           console.log('The Order updated successfully')
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //     })
  //     .catch( err => {
  //       console.log(err)
  //     })
  // }


  render() {
    const { orders, } = this.state
    const { auth: { user } } = this.props

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {
                orders.map((o) => {
                  return (
                    <Order key={o.id} {...o} user_id={o.user_id} updateTicket={this.updateTicket} />
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
                          <Table.Cell>{o.last_name} </Table.Cell>
                          <Table.Cell>{o.ticket}</Table.Cell>
                          <Table.Cell><Button onClick={() => this.copyOrder(o.id, user.id)}>Click Here</Button></Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    )
                  })
                }
              </Table>
              {user.admin && <Button size="medium" color="red" onClick={this.toggleReset}>Done</Button>}
              <Link to='/new_order'>
                <Button size='medium' color='blue'>New Order</Button>
              </Link> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
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


