import React, { Component } from 'react';
import { Form } from "semantic-ui-react";
import axios from 'axios';


class OrderFormAdin extends Component {

  state = { current: true, orderDate: '', ticket: '', restaurants: [], restaurantData: [], restaurant: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add(this.state);
    this.setState({ orderDate: '', restaurant: '', restaurants: [], restaurantData: [] });
  }

  // handleChange = (e) => { 
  //   const { name, value } = e.target
  //   this.setState({ [name]: value });
  // }
  handleChange = (e, {name, value}) => {
    // const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }

  handleSelect = (e) => { 
    const { innerText } = e.target
    this.setState({ restaurant: innerText });
  }

  componentDidMount() {
    axios.get('/api/restaurants')
       .then( res => {
          this.setState({ restaurants: res.data })
          const { restaurants, restaurantData} = this.state
          restaurants.map( r => {
            var temp = restaurantData;
            temp.push({ key: r.id, text: r.name, values: r.name})
            this.setState({restaurantData: temp})
          })
       })
      .catch( err => {
        console.log(err)
      });
  }

  render() {

    const {restaurantData, orderDate, restaurant} = this.state
    // const {handleChange, handleSubmit, handleSelect} = this

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Dropdown
            label='Select Restaurant'
            placeholder="Restaurant"
            required
            fluid
            search
            selection
            name='restaurant'
            value={restaurant}
            options={restaurantData}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Order Date"
            name="orderDate"
            type="date"
            onChange={this.handleChange}
            value={orderDate}
            required
          />
          <Form.Button color="blue">Create Order</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}
export default OrderFormAdin;

