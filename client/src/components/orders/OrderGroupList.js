import React from 'react';
import { withRouter, } from 'react-router-dom';
import Order from './Order'
import axios from 'axios';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Header, Button, } from 'semantic-ui-react';

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component{
  state = {orders:[], editing: false, }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  toggleReset = () => {
    this.setState( state => {
      return {orders: [], }
    })
  }

  
  adminReset = () => {
    const { auth: { user, } } = this.props
    
    if (user.admin === true) {
      return(
        <>
        <Button size="medium" color="red" onClick={this.toggleReset}>Done</Button>
        </>
      )
    }
  }


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
    const { orders, } = this.state
    return(
    <>
      <ul>
      <Header as='h1'>Orders:</Header>
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
        {this.adminReset()}
    </>

    )
  }
}

export class ConnectedOrderList extends React.Component {
  render() {
    return(
      <AuthConsumer>
        { auth =>
            <OrderList {...this.props } {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedOrderList);