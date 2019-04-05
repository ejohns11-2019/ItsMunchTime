import React, { Component } from 'react';
import { Form, } from "semantic-ui-react";

class OrderFormAdin extends Component {

  state = {current: "true"};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add(this.state);
    this.setState();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  const 

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          {/* <Form.Input
            placeholder="Restaurant"
            label="Restaurant"
            name="restaurant"
            onChange={this.handleChange}
            value={this.state.title}
          /> */}
          <Form.Input
            placeholder="Order Date"
            label="Order Date"
            name="orderDate"
            onChange={this.handleChange}
            value={this.state.orderDate}
          />
          <Form.Input
            placeholder="Select Restaurant"
            label="Restaurant"
            fluid
            selection
            required
            options={groupOptions}
            onChange={this.handleChange}
          />
           <Form.Select
            label='Select Group'
            placeholder='Select Group'
            fluid
            selection
            required
            options={groupOptions}
            />
          <Form.Button color="green">Create Order</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}
export default OrderFormAdin;