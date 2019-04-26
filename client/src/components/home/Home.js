import React from 'react';
//import { Link } from 'react-router-dom';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Container, } from 'semantic-ui-react';
import OrderList from '../orders/OrderGroupList';
import OrderHistory from '../orders/OrderHistory';
import './home.css';
import Image from '../../images/Screen Shot 2019-04-23 at 6.29.27 PM.png'



class Home extends React.Component {

  adminHome = () => {
    const { auth: { user, }, } = this.props;

    if (user.admin === true) {
      return (
        <>
        <Container>
        <br />
          <OrderList />
          <OrderHistory userId = {this.props.auth.user.id} />
        </Container>
        </>
      )
    } else {
      return (
        <>
        <Container>
        <br />
          <OrderList />
          <OrderHistory />
        </Container>
        </>
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
