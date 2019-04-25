import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Order from './Order'
import axios from 'axios';
import './orderGroupList.css';
import { AuthConsumer, } from "../../providers/AuthProvider";
import {Grid, Table, Button, Icon } from 'semantic-ui-react';

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
        <Grid stackable> 
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
              <Table stackable celled color="red">
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
                        <Table.Row textAlign='center'>
                          <Table.Cell>{o.first_name} {o.last_name} </Table.Cell>
                          <Table.Cell>{o.ticket}</Table.Cell>
                          <Table.Cell textAlign='center'><Button style={{color:"#ff6e00"}} unqiueticket={o.ticket} onClick={() => this.duplicateOrder(o.ticket)}>Order This <Icon name='food' fitted color="white"/></Button></Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    )
                  })
                }
              </Table>
              {user.admin && <Button size='large' animated='vertical' style={{color:"#ff6e00"}} onClick={this.toggleReset}><Button.Content hidden>Archive</Button.Content><Button.Content visible> <Icon name='archive' fitted color='white'/></Button.Content></Button>}
              {user.admin && <Link to='/new_order'>
                <Button size='large' animated='horizontal' style={{backgroundColor: "#0f4c5c", color: "white" }}><Button.Content hidden>New</Button.Content><Button.Content visible><Icon name='plus'/></Button.Content></Button>
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
