import React, { Fragment, } from "react";
import RestaurantForm from "./RestaurantForm";
import { Card, } from "semantic-ui-react";
import axios from 'axios';

class Restaurant extends React.Component {
    state = { restaurants: [] }

    render() {
      const { name, address, phone, menu } = this.props
        return (
          <>
            <Card>
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                  Address: {address}
                  Phone:  {phone}
                </Card.Description>
                <Card.Meta>
                  Menu: {menu}
                </Card.Meta>
              </Card.Content>
            </Card>
            <RestaurantForm />
          </>
        )
    }
}

export default Restaurant;
