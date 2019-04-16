import React, {Component} from 'react';
import { Item, Icon, Image } from 'semantic-ui-react';
import { AuthConsumer } from '../../providers/AuthProvider';
import axios from 'axios';



class Order extends Component {
  state = { editing: false, loading: false, formValues: { user: {id: '', first_name: '',}, restaurant: {id: '', name:''}, order: {id: '', restaurant_id: '', user_id: '', ticket: '', current: '', order_date: '',}}}

  toggleLoaded = () => {
    this.setState({ loading: true})
  }

  componentDidMount() {
    const { user, restaurant, order, getOrders, setRestaurant} = this.props.auth

    this.setState({ formValues: {...user}, order: getOrders(user.id, this.toggleLoaded,), restaurant,
  })
  }

  render() {
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
          {/* <Item.Description> */}
            {/* <Image size='small' src='https://www.publicdomainpictures.net/pictures/50000/nahled/letterhead-silhouette.jpg' /> */}
          {/* </Item.Description> */}
          {/* <Item.Extra>Additional Details</Item.Extra> */}
        </Item.Content>
    </Item>
  </Item.Group>
    </>
      )
    }
    return(
      <p>Loading</p>
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

export default ConnectedOrder;