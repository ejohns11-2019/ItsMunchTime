import React, { Component } from 'react';
import axios from 'axios';
import {Table, Button} from 'semantic-ui-react';
import Order from './Order'

//Logical component that will handle order history

class OrderHistory extends Component {

  state = {orders: [], lastFiveOrders: [], all: false}

  componentDidMount() {
    
    axios.get('/api/user_history')
      .then(res => {
        this.setState({orders: res.data,})
        this.getLastFiveOrders();
      })
      .catch(err => {
        console.log(err)
      })
  }

  getLastFiveOrders = () => {
    axios.get('/api/user_history_last_five')
      .then(res => {
        this.setState({lastFiveOrders: res.data,})
      })
      .catch(err => {
        console.log(err)
      })
  }

  printLastFiveOrders = () => { 
    const {lastFiveOrders} = this.state
    return lastFiveOrders.map(l => {
       return(
        <Table.Row>
          <Table.Cell>
            {l.rest_name}
          </Table.Cell>
          <Table.Cell>
            {l.ticket}
          </Table.Cell>
          <Table.Cell>
            {l.order_date}
          </Table.Cell>
        </Table.Row>
        )
      })
  }

  printAllOrders = () => {
    const {orders} = this.state
    return orders.map(o => {
       return(
        <Table.Row>
          <Table.Cell>
            {o.rest_name}
          </Table.Cell>
          <Table.Cell>
            {o.ticket}
          </Table.Cell>
          <Table.Cell>
            {o.order_date}
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  switchLogic = () => {
    this.setState(state => ({
      all: !state.all
    }));
  }

  render() {
    return (
      <>
      <h2>Order History</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Restaurant</Table.HeaderCell>
            <Table.HeaderCell>Food</Table.HeaderCell>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.all ? this.printAllOrders() : this.printLastFiveOrders() }
        </Table.Body>
      </Table>
      <Button onClick={this.switchLogic}> 
        {this.state.all ? 'View Five' : `View All`}
      </Button>
      </>
    )
  }
}

export default OrderHistory;