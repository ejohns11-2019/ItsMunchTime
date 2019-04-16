import React from 'react';
import Order from './Order'
import axios from 'axios';
import { Header, } from 'semantic-ui-react';

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component{
  state = {orders:[],}


  componentDidMount() {
    axios.get('/api/orders')
      .then( res => {
        this.setState({ orders: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }
  render(){
    const { orders,} = this.state
    return(
    <>
      <ul>
      <Header as='h1'>This is the OrderList Component</Header>
          {
            orders.map( (o, i) => {
            return(
              <Order
                key={o.id}
                {...o}
              />
              )
            })
          }
        </ul>
    </>

    )
  }
}

export default OrderList;
