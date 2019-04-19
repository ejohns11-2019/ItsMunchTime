import React, {Component} from 'react';
import { Icon, Button, Form } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import axios from 'axios';
import OrderFormUser from './OrderFormUser';
import { withRouter } from 'react-router-dom';

class Order extends Component {
  state = { order: [], }

  componentDidMount(){
    this.setState({order: {...this.props}, ticket: this.props.ticket})
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

  render() {
    const { auth: { user, } } = this.props
    const { order } = this.state
    if (order.user_id == user.id){
    return (
      <>
        <h2>Order Number: {order.id}</h2>
        <h2>Restaurant: {order.rest_name}</h2>
        <h2>View Menu: <a href={order.menu} target="_blank">{order.menu}</a></h2> 
        <h2>Current Order Ticket: {this.props.ticket}</h2>
        
        <h2>Submit your order below:</h2>
        <OrderFormUser id={this.props.id} user_id={this.props.user_id} editOrder={this.editOrder} updateTicket={this.props.updateTicket} />      
      </>
    )}else{
      return(
        <div>
          {/* No Match */}
        </div>
        
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
