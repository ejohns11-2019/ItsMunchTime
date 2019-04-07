import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Header, } from 'semantic-ui-react';
import Restaurant from './Restaurant';
import RestaurantForm from "./RestaurantForm";
import { RestaurantConsumer, } from "../../providers/RestaurantProvider";

class Restaurants extends React.Component {
  state = { restaurants: [], };

  componentDidMount() {
    axios.get('/api/restaurants')
     .then(res => this.setState({ restaurants: res.data, }))
   }

  render() {
    const { restaurants, } = this.state
    return (
      <RestaurantConsumer>
        { value => (
        <div>
          <Header as='h1'>Restaurants</Header>
          <>
            { restaurants.map( restaurant =>
              < Restaurant
                key={restaurant.id}
                {...restaurant}
              />
              )
            }
          </>
          <RestaurantForm />
        </div>
        )}
      </RestaurantConsumer>
    )
  }
}

export default Restaurants
