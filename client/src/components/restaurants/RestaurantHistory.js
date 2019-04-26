import React, { Component } from 'react';
import axios from 'axios';
import { Table, Icon } from 'semantic-ui-react';

// presentational component that shows the contents of an order.
// this would include current and historical orders.

class RestaurantHistory extends Component {

  state = { 
    orders: [],
    column: 'orders.order_date',
    directionToggle: true,
    direction_first: '',
    direction_last: '',
    direction_date: ''
   };

  componentDidMount() {
    axios.get('/api/restaurant_history', { params: { 
      restaurant_id: this.props.location.state.restId, 
      column: this.state.column,
      direction: this.state.direction 
    }})
      .then(res => {
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

  getColumn = (column_id) => {
    switch (column_id) {
      case 1 :
        this.state.column = 'users.first_name'
        break
      case 2 :
        this.state.column = 'users.last_name'
        break
      case 3 :
        this.state.column = 'orders.order_date'
        break
    }
    this.changeDirection()
    this.componentDidMount()
  }

  changeDirection() {
    this.state.directionToggle = !this.state.directionToggle

    if (this.state.directionToggle == false) 
      this.state.direction = 'DESC'
    else 
      this.state.direction = 'ASC'
        
  }


  render() {
    return (
      <>
      <br />
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => this.getColumn(1)}><Icon name = {this.state.directionToggle? 'sort up' :'sort down' }/ >User First Name</Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.getColumn(2)}><Icon name = {this.state.directionToggle? 'sort up' :'sort down' }/ >User Last Name</Table.HeaderCell>
            <Table.HeaderCell>Food</Table.HeaderCell>
            <Table.HeaderCell onClick={() => this.getColumn(3)}><Icon name = {this.state.directionToggle? 'sort up' :'sort down' }/ >Order Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.printOrders()}
        </Table.Body>
      </Table>
      <br />
      </>
    )
  }
}

export default RestaurantHistory;
