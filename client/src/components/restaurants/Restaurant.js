import React from "react";
import { Card, Button, Icon, } from "semantic-ui-react";
import RestaurantForm from './RestaurantForm'
import RestaurantHistory from "./RestaurantHistory";
import {Link } from 'react-router-dom';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { withRouter, } from 'react-router-dom';

class Restaurant extends React.Component {
  state = {restaurant: {editing: false, }, }
//const Restaurant = ({ id, name, address, phone, menu, editRestaurant, deleteRestaurant }) => (
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  restaurantView = () => {
    //const { restaurant, } = this.props
    return (
      <>
        <Card>
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
      </>
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
            color="blue"
            size="tiny"
            onClick={() => this.toggleEdit(this.props.id)}
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
            onClick={ () => this.props.deleteRestaurant(this.props.id) }
            style={{ marginLeft: "15px", }}
          >
            <Icon name ="trash" />
          </Button>
          <Link
            color="red"
            style={{ marginLeft: "15px", }}
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
          color="red"
          style={{ marginLeft: "15px", }}
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
