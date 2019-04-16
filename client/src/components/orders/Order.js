import React, {Component} from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import axios from 'axios';
import OrderFormUser from './OrderFormUser';
import { withRouter } from 'react-router-dom';



class Order extends Component {
  state = { order: {}, editing: false, }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
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

  displayOrder = () => {

    const {user, order} = this.props.auth

    if (this.state.loading) {
      return (  
          <>
          

    

  <Item.Group>
    <Item>
      <Item.Image size='tiny' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Food_font_awesome.svg/600px-Food_font_awesome.svg.png' />
      <Item.Content>
      <Item.Header as='a'>{user.first_name}</Item.Header>
      <Item.Meta>{order.ticket}</Item.Meta>
      <Item.Description>
            <Image size='small' src='https://www.publicdomainpictures.net/pictures/50000/nahled/letterhead-silhouette.jpg' />
          </Item.Description>
        </Item.Content>
    </Item>
  </Item.Group>
  
    </>

      )
  }

  orderEditView = () => {
      return (
        <OrderFormUser
          id={this.props.id}
          user_id={this.props.user_id}
          ticket={this.props.ticket}
          restaurant_id={this.props.restaurant_id}
          order_date={this.props.order_date}
          current={this.props.current}
          editOrder={this.editOrder}
          toggleEdit={this.toggleEdit}
        />
      )
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

  identityCheck = () => {
    const { auth: { user, } } = this.props

    if (user.admin === true || user.id === this.order.user_id) {
      return (
        <>
          { this.state.editing ? this.orderEditView() : this.displayOrder() }
          <Button
            icon
            color="blue"
            size="tiny"
            onClick={() => this.toggleEdit()}
          >
            { this.state.editing ? 'Cancel'
            :
            <Icon name="pencil" />
            }
          </Button>
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
      )
    } else {
      return(
        this.displayOrder()
      )
    }
  }

  render() {
    //const { orders, } = this.state
    return (
      <div>
        { this.identityCheck() }
      </div>
    )
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
