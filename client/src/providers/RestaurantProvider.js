import React from "react";

const RestaurantContext = React.createContext();

export const RestaurantConsumer = RestaurantContext.Consumer;

class RestaurantProvider extends React.Component {
  state = {
    name: "",
    address: "",
    phone: "",
    menu: "",
    updateRestaurant: (restaurant) => this.updateRestaurant(restaurant),
  };

  updateRestaurant = (restaurant) => {
    this.setState({ ...restaurant, })
  }

  render() {
    return (
      <RestaurantContext.Provider value={this.state}>
        { this.props.children }
      </RestaurantContext.Provider>
    )
  }
}

export default RestaurantProvider;
