import React, { Component } from 'react';
import Order from './Order'

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends Component {

  render() {

    return (
      <>
      <h2>This is the Group's order</h2>
      <Order />
      </>
    )
  }
}

export default OrderList;