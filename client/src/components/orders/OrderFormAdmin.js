import React, { Component } from 'react';
import { Form, } from "semantic-ui-react";

class OrderFormAdin extends Component {

  state = {restaurant :'', current: true, order_date: '', ticket: ''};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add(this.state);
    this.setState();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            placeholder="Order Date"
            label="Order Date"
            name="orderDate"
            onChange={this.handleChange}
            value={this.state.orderDate}
          />
          <Form.Input
            placeholder="Restaurant"
            label="Restaurant"
            name="restaurant"
            onChange={this.handleChange}
            value={this.state.restaurant}
          />
           <Form.Select
            label='Select Group'
            placeholder='Select Group'
            fluid
            selection
            required
            options={groupOptions}
            />
          <Form.Button color="blue">Create Order</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}
export default OrderFormAdin;

