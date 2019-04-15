import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';

// presentational component that shows the contents of an order.
// this would include current and historical orders.

class RestaurantHistory extends Component {

  state = { orders: [] };

  componentDidMount() {
    axios.get('/api/restaurant_history', { params: { restaurant_id: this.props.location.state.restId } })
      .then(res => {
         debugger
        this.setState({ orders: res.data })
      })
      .catch(err => {
        console.log(err)
      });
  }

  printOrders = () => {
    return this.state.orders.map(o => {
       return(
      <Table.Row>
        <Table.Cell>
          {o.first_name}
        </Table.Cell>
        <Table.Cell>
          {o.last_name}
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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User First Name</Table.HeaderCell>
            <Table.HeaderCell>User Last Name</Table.HeaderCell>
            <Table.HeaderCell>Food</Table.HeaderCell>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.printOrders()}
        </Table.Body>
      </Table>
    )
  }
}

export default RestaurantHistory;