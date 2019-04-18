import React, {Component} from 'react';
import { Item, Icon, Button, Image } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import axios from 'axios';
import OrderFormUser from './OrderFormUser';
import { withRouter } from 'react-router-dom';



class Order extends Component {
  state = { order: [], }

  componentDidMount(){
    
    this.setState({order: {...this.props}})
    // debugger
  } 

  deleteOrder = (id) => {
    axios.delete(`/api/orders/${id}`)
      .then( res => {
        const { orders } = this.state;
        this.setState({ orders: orders.filter( o => o.id !== id ) })
      })
      .catch( err => {
        alert(err.response.data.message)
      })
  }

  // orderEditView = () => {
  //     return (
  //       <OrderFormUser
  //         id={this.props.id}
  //         user_id={this.props.user_id}
  //         ticket={this.props.ticket}
  //         restaurant_id={this.props.restaurant_id}
  //         order_date={this.props.order_date}
  //         current={this.props.current}
  //         editOrder={this.editOrder}
  //         toggleEdit={this.toggleEdit}
  //       />
  //     )
  //   }

  editOrder = (order) => {
    axios.put(`/api/orders/${order.id}`, order )
      .then( res => {
        this.setState({ order: res.data })
        window.location.href = '/'
      })
      .catch( err => {
        console.log(err)
      })
  }

  identityCheck = () => {
    
    
}


  render() {
    const { auth: { user, } } = this.props
    const { order } = this.state
    if (order.user_id == user.id){
    return (
      <>
        <h2>Order: {order.id}</h2>
        <h2>User: {order.first_name}</h2>
        <h2>Restaurant: {order.rest_name}</h2>
        <h2>Menu: <a href={order.menu}>{order.menu}</a></h2> 

        <h2>CurrentUser: {user.id}</h2>
              
        <h2>Single Order</h2>
        <OrderFormUser id={this.props.id} user_id={this.props.user_id} editOrder={this.editOrder} updateTicket={this.props.updateTicket} />
          <Button
            icon
            color="red"
            size="tiny"
            onClick={ () => this.deleteOrder(this.props.id) }
            style={{ marginLeft: "15px", }}
          >
            <Icon name ="trash" />
          </Button>
             
      </>
    )}else{
      return(
        <div></div>
        // <h1>No Match</h1>
      )
    }
  }
}

const ConnectedOrder = (props) => (
  <AuthConsumer>
    { auth =>
      <Order { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default withRouter(ConnectedOrder);
