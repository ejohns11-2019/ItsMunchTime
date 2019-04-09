import React, { Component } from 'react';
import { Form, Dropdown } from "semantic-ui-react";
import axios from 'axios';


class OrderFormAdin extends Component {

  state = { current: true, orderDate: '', ticket: '', restaurants: [], };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add(this.state);
    this.setState({ orderDate: '', restaurant: '' });
  }

  // handleRestarants = (e) => {
  //   if (this.state.restaurants.length ==0) {
  //     alert("No restaurants")
  //   } else {
  //   this.handleChange
  //   }
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  componentDidMount() {
    axios.get('/api/restaurants')
       .then( res => {
         this.setState({ restaurants: res.data })
       })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          {/* <Form.Select
            placeholder="Restaurant"
            label="Restaurant"
            name="restaurant"
            onChange={this.handleChange}
            options={this.restaurants}
            required
          /> */}
          <Form.Dropdown
            placeholder='Select Restaurant'
            label="Restaurant"
            fluid
            search
            selection
            options={this.state.restaurants}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Order Date"
            name="orderDate"
            type="date"
            onChange={this.handleChange}
            value={this.state.orderDate}
            required
          />
          <Form.Button color="blue">Create Order</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}
export default OrderFormAdin;

