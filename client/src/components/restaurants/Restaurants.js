import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Header, } from 'semantic-ui-react';
import Restaurant from './Restaurant';

class Restaurants extends React.Component {
  state = { restaurants: [], };

  componentDidMount() {
    axios.get('/api/restaurants')
     .then(res => this.setState({ restaurants: res.data, }))
   }

  render() {
    const { restaurants, } = this.state
    return (
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
      </div>
    )
  }
}

export default Restaurants
