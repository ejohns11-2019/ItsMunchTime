import React, { Component } from 'react';
import Order from './Order'

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends Component {

  render() {

    return (
      <>
      <h2>This is the OrderList Component</h2>
      <Order />
      </>
    )
  }
}

export default OrderList;