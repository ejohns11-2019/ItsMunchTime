import React from 'react';
import axios from 'axios';
import { Header, } from 'semantic-ui-react';
import Restaurant from './Restaurant';
import RestaurantForm from "./RestaurantForm";

class Restaurants extends React.Component {
  state = { restaurants: [], };

  componentDidMount() {
    axios.get('/api/restaurants')
       .then( res => {
         this.setState({ restaurants: res.data })
       })
      .catch( err => {
        console.log(err)
      })
  }

  deleteRestaurant = (id) => {
    axios.delete(`/api/restaurants/${id}`)
      .then( res => {
        const { restaurants } = this.state;
        this.setState({ restaurants: restaurants.filter( r => r.id != id ) })
      })
      .catch( err => {
        console.log(err)
      })
  }

  displayRestaurant = () => {
    return this.state.restaurants.map ( r => <Restaurant key={r.id} {...r} />)
  }

  addRestaurant = (restaurant) => {
    axios.post('/api/restaurants', restaurant )
    .then( res => {
      const { restaurants } = this.state
      this.setState({ restaurants: [...restaurants, res.data] })
    })
    .catch( err => {
      console.log(err)
    })
  }

  editRestaurant = (restaurant) => {
    axios.put(`/api/restaurants/${restaurant.id}`, { restaurant } )
      .then( res => {
        const restaurants = this.state.departments.map( d => {
          if (d.id === restaurant.id)
            return res.data
          return d
        })
        this.setState({ restaurant })
      })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    const { restaurants, } = this.state
    return (
        <div>
          <Header as='h1'>Restaurants</Header>

        <ul>
        <Header as='h1'>Restaurant List</Header>
          {
            restaurants.map( (r, i) => {
            return(
              <Restaurant
                key={r.id}
                {...r}
                deleteRestaurant={this.deleteRestaurant}
              />
              )
            })
          }
        </ul>
          <RestaurantForm addRestaurant={this.addRestaurant} editRestaurant={this.editRestaurant} />
        </div>
    )
  }
}

export default Restaurants
