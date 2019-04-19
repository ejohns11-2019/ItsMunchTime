import React, { Component } from 'react';
import axios from 'axios';
import {Table} from 'semantic-ui-react';
import Order from './Order'

//Logical component that will handle order history

class OrderHistory extends Component {

  state = {orders: [], orders: [] }

  componentDidMount() {
    axios.get('/api/user_history')
      .then(res => {
        this.setState({orders: res.data,})
      })
      .catch(err => {
        console.log(err)
      })
  }

  printLastFiveeOrders = () => {
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
          {this.printLastFiveeOrders()}
        </Table.Body>
      </Table>
      </>
    )
  }
}

export default OrderHistory;