import React, { Component } from 'react';
import { Form } from "semantic-ui-react";
import { AuthConsumer, } from "../../providers/AuthProvider";
import axios from 'axios';


class OrderFormAdin extends Component {

  state = { 
    current: true, 
    orderDate: '', 
    ticket: '', 
    restaurants: [], 
    restaurantData: [], 
    restaurant: '', 
    r_id: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
 const { auth: { restaurant, } } = this.props
    if ( restaurant !== null ) {
      alert('Order in Progress')
    } else {
      const { current, orderDate, ticket, r_id }  = this.state
  
      const order_date = orderDate
      const restaurant_id = r_id
  
      axios.post('/api/orders', {current, order_date, ticket, restaurant_id})
        .then(res => {
          this.props.history.push("/")
          alert("Order has been created successfully");
          // this.componentDidMount()
        })
        .catch( err => {
          console.log(err);
        })
      this.setState({ orderDate: '', restaurant: '', restaurants: [], restaurantData: [], r_id: '' })
    }  
  }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value, });
  }

  handleSelect = (e, data) => { 
   
    this.setState({ restaurant: data.value, r_id: data.key });
    this.state.restaurantData.map(rd => {
      if (rd.value == data.value) 
        this.setState({r_id: rd.key})
    })
  }

  componentDidMount() {
    axios.get('/api/restaurants')
       .then( res => {
          this.setState({ restaurants: res.data })
          const { restaurants, restaurantData} = this.state
          restaurants.map( r => {
            var temp = restaurantData;
            temp.push({ key: r.id, text: r.name, value: r.name})
            this.setState({restaurantData: temp})
          })
       })
      .catch( err => {
        console.log(err)
      });
  }

  render() {

    const {restaurantData, orderDate, restaurant} = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Dropdown
            label='Select Restaurant'
            placeholder="Restaurants"
            required
            fluid
            search
            selection
            name='restaurant'
            value={restaurant}
            options={restaurantData}
            onChange={this.handleSelect}
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

export class ConnectedOrderFormAdin extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <OrderFormAdin { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default ConnectedOrderFormAdin;

