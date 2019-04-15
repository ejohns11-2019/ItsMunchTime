import React from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Container, Button } from 'semantic-ui-react';
import OrderList from '../orders/OrderGroupList';
import OrderHistory from '../orders/OrderHistory';
import Order from '../orders/Order';



class Home extends React.Component {

  adminHome = () => {
    const { auth: { user, }, location, } = this.props;

    if (user.admin == true) {
      return (
        <Container>
          <OrderList />
          <OrderHistory />
          <Order />
          <Link to='/new_order'>
            <Button size='medium' color='blue'>New Order</Button>
          </Link>
        </Container>
      )
    } else {
      return (
        <Container>
          <OrderList />
          <OrderHistory />
          <Order />
        </Container>
      )
    }
  } 

  render() {
    return (
       this.adminHome()
    )
  }
}

export class ConnectedHome extends React.Component {
  render () {
    return (
      <AuthConsumer>
        { auth => 
          <Home { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}
export default ConnectedHome;
