import React, { Component } from 'react';
import { Form, } from "semantic-ui-react";

class OrderFormAdin extends Component {
  
  state = {restaurant :'', current: true, orderDate: '', ticket: '',};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add(this.state);
    this.setState({ orderDate: '', restaurant: '' });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
        <Form.Input
            placeholder="Restaurant"
            label="Restaurant"
            name="restaurant"
            onChange={this.handleChange}
            value={this.state.restaurant}
            required
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

