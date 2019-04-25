import React from "react";
import { Card, Button, Icon, Image } from "semantic-ui-react";
import RestaurantForm from './RestaurantForm'
import {Link } from 'react-router-dom';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { withRouter, } from 'react-router-dom';
import './restaurants.css';
import Burger from '../../images/food/burger.jpg';
import Healthy from '../../images/food/healthy.jpg';
import Pizza from '../../images/food/pizza.jpg';
import Salad from '../../images/food/salad.jpg';
import Veggies from '../../images/food/veggies.jpg';
import Wrap from '../../images/food/wrap.jpg';

class Restaurant extends React.Component {
  state = {restaurant: {editing: false, }, randomImage: '' }
//const Restaurant = ({ id, name, address, phone, menu, editRestaurant, deleteRestaurant }) => (
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  componentDidMount() {
    const imageArray = [Burger,Healthy,Pizza,Salad,Veggies,Wrap];
    const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];

    this.setState({randomImage: randomImage});

  }

  restaurantView = () => {
    //const { restaurant, } = this.props
    return (
      <div className='restaurant'>
        <Card>
        <Image src={this.state.randomImage}/>
          <Card.Content>
            <Card.Header>
            <Link
              to={{
                pathname: "/restaurant_details",
                state: {restId: this.props.id,
                  name:  this.props.name,
                  address: this.props.address,
                  phone: this.props.phone,
                  menu: this.props.menu
                }
              }}
            >
            { this.props.name } </Link>
            </Card.Header>
            <Card.Description>
              Address: { this.props.address }<br/>
              Phone:  { this.props.phone }
            </Card.Description>
            <Card.Meta>
              Menu: { this.props.menu }
            </Card.Meta>
          </Card.Content>
        </Card>
      </div>
    )
  }

  restaurantEdit = () => {
    //const { restaurant, } = this.props;
      return (
        <RestaurantForm id={this.props.id} name={this.props.name} address={this.props.address} phone={this.props.address} menu={this.props.menu} editRestaurant={this.props.editRestaurant}
        addRestaurant={this.props.addRestaurant}
        toggleEdit={this.toggleEdit}
        />
      )
    }

  adminCheck = () => {
    const { auth: { user, } } = this.props

    if (user.admin === true) {
      return (
        <>
          { this.state.editing ? this.restaurantEdit() : this.restaurantView() }
          <Button
            icon
            style={{backgroundColor: "#0f4c5c", color: "white" }}
            size="tiny"
            onClick={() => this.toggleEdit(this.props.id)}
          >
            { this.state.editing ? 'Cancel'
            :
            <Icon name="pencil" color= "#ff6e00" />
            }
          </Button>
          <Button
            icon
            color="red"
            size="tiny"
            onClick={ () => this.props.deleteRestaurant(this.props.id) }
            style={{ margin: "15px", }}
          >
            <Icon name ="trash" />
          </Button>
          <Link
            color="red"
            style={{ margin: "15px", }}
            to={{
              pathname: "/restaurant_history",
              state: {restId: this.props.id}
            }}
          >History</Link>
        </>
      )
    } else {
      return(
      <>
        {this.restaurantView()}
        <Link
          style={{ marginLeft: "15px", color: "#0f4c5c", }}
          to={{
            pathname: "/restaurant_history",
            state: {restId: this.props.id}
          }}
        >History</Link>
      </>
      )
    }
  }

    render() {
      return(
      this.adminCheck()
    )}
}

export class ConnectedRestaurant extends React.Component {
  render() {
    return(
      <AuthConsumer>
        { auth =>
            <Restaurant {...this.props } {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedRestaurant);
