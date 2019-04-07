import React from "react";
import { Form, } from "semantic-ui-react";
import { RestaurantConsumer, } from "../../providers/RestaurantProvider";

class RestaurantForm extends React.Component {
  state = {
    name: this.props.name,
    address: this.props.address,
    phone: this.props.phone,
    menu: this.props.menu,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, });

  handleSubmit = (e) => {
    e.preventDefault();
    const restaurant = { ...this.state, };
    this.props.updateRestaurant(restaurant);
  }

  render() {
    const { name, address, phone, menu, } = this.state;
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="RestaurantName"
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <Form.Input
          label="RestaurantAddress"
          type="text"
          name="address"
          value={address}
          onChange={this.handleChange}
        />
        <Form.Input
          label="RestaurantPhone"
          type="text"
          name="phone"
          value={phone}
          onChange={this.handleChange}
        />
        <Form.Input
          label="RestaurantMenu"
          type="text"
          name="menu"
          value={menu}
          onChange={this.handleChange}
        />
        <Form.Button color="blue">Save</Form.Button>
      </Form>
    )
  }
}

const ConnectedRestaurantForm = (props) => {
  return (
    <RestaurantConsumer>
      { value => (
        <RestaurantForm
          { ...props }
          name={value.name}
          address={value.address}
          phone={value.phone}
          menu={value.menu}
          updateRestaurant={value.updateRestaurant}
        />
      )}
    </RestaurantConsumer>
  )
}

export default ConnectedRestaurantForm;
