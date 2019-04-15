import React, { Component } from 'react';
import Order from './Order'

//Logical component that will handle order history

class OrderHistory extends Component {

  render() {

    return (
      <>
      <h2>Order History</h2>
      <Order />
      </>
    )
  }
}

export default OrderHistory;