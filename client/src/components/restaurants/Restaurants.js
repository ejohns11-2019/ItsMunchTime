import React from 'react';
import axios from 'axios';
import { Header, } from 'semantic-ui-react';
import Restaurant from './Restaurant';
import RestaurantForm from "./RestaurantForm";
//import { Link, } from 'react-router-dom';

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
        this.setState({ restaurants: restaurants.filter( r => r.id !== id ) })
      })
      .catch( err => {
        alert(err.response.data.message)
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
      alert(err.response.data.message)
    })
  }

  editRestaurant = (restaurant) => {
    axios.put(`/api/restaurants/${restaurant.id}`, restaurant )
      .then( res => {
        const restaurants = this.state.restaurants.map( r => {
          if (r.id === restaurant.id)
            return res.data
          return r;
        })
        this.setState({ restaurants, })
      })
      .catch( err => {
        console.log(err)
      })
  }

//if click blue pencil button by rest. want to render RestForm for edit
  render() {
    const { restaurants, } = this.state
    return (
        <div>
          <Header as='h1'>Restaurants</Header>

        <ul>
        <Header as='h1'>List of All Restaurants</Header>
          {
            restaurants.map( (r, i) => {
            return(
              <>
                <br />
                <br />
                <Restaurant
                  key={r.id}
                  {...r}
                  deleteRestaurant={this.deleteRestaurant}
                  editRestaurant={this.editRestaurant}
                  addRestaurant={this.addRestaurant}
                />
              </>
              )
            })
          }
        </ul>
          <hr/>
          <h1>Add a New Restaurant</h1>
          <RestaurantForm addRestaurant={this.addRestaurant} />
          <hr />
        </div>
    )
  }
}

export default Restaurants
