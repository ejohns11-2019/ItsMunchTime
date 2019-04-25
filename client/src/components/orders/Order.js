import React, {Component} from 'react';
import { Icon, Button, Form, Grid } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import axios from 'axios';
import OrderFormUser from './OrderFormUser';
import { withRouter } from 'react-router-dom';
import './order.css'
class Order extends Component {
  state = { order: [], editing: true, ticket: '' }

  componentDidMount(){
    this.setState({order: {...this.props}, ticket: this.props.ticket})
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

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  orderForm = () =>{
    return(
    <>
      <OrderFormUser id={this.props.id} user_id={this.props.user_id} editOrder={this.editOrder} updateTicket={this.props.updateTicket} toggleEdit={this.toggleEdit} />
    </>
    )
  }

  render() {
    const { auth: { user, } } = this.props
    const { order } = this.state
    if (order.user_id === user.id){
      this.props.setCurrentUserOrderId(order)
    return (
   
        <Grid width={16} id="menu">
        <Grid.Column width={16}>
        <h2 className='restaurant'>Today's lunch will be from: {order.rest_name}</h2>
        <a href={order.menu} target="_blank"><Button>View Menu</Button></a><br/>
        </Grid.Column>
        <Grid.Column width={16}>
        <iframe src={order.menu} width="100%" height="400">
          <a href={order.menu} target="_blank"><h2>View Menu</h2> </a>
        </iframe>
        </Grid.Column>
        <Grid.Column width={16}>
        <h2>Current Order Ticket: {this.props.ticket}</h2>
        </Grid.Column>
        <Grid.Column width={16}>
        <h2>Submit your order here:</h2>
        { this.state.editing ? this.orderForm() : <div></div> }
        </Grid.Column>
        <Form>
        <Grid.Column width={16}>
        <Button
          icon
          style={{backgroundColor: "#0f4c5c", color: "white", width: "100%" }}
          onClick={() => this.toggleEdit()}
          >
          { this.state.editing ? 'Cancel'
          :
          <div>Edit &#160; <Icon name='pencil' /></div>
          }

        </Button>
        </Grid.Column>
        </Form>
        </Grid>
    )
  } else{
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
