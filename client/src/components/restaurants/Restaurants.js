import React from 'react';
import axios from 'axios';
import { Header, Grid, } from 'semantic-ui-react';
import Restaurant from './Restaurant';
import RestaurantForm from "./RestaurantForm";
import './restaurants.css'


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

  render() {
    const { restaurants, } = this.state
    return (
       <div className='restaurants'>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Header as='h1'>All Restaurants:</Header>
                <ul>
                  {
                    restaurants.map( (r, i) => {
                    return(
                      <>
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
              </Grid.Column>
            <Grid.Column>
              <RestaurantForm addRestaurant={this.addRestaurant} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Restaurants
