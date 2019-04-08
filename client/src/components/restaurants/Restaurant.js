import React, { Fragment, } from "react";
import RestaurantForm from "./RestaurantForm";
import { Card, } from "semantic-ui-react";
import { RestaurantConsumer, } from "../../providers/RestaurantProvider";

const Restaurant = () => (
  <RestaurantConsumer>
    { value => (
      <>
        <Card>
          <Card.Content>
            <Card.Header>{ value.name }</Card.Header>
            <Card.Description>
              Address: { value.address }
              Phone:  { value.phone }
            </Card.Description>
            <Card.Meta>
              Menu: { value.menu }
            </Card.Meta>
          </Card.Content>
        </Card>
        <RestaurantForm />
      </>
    )}
  </RestaurantConsumer>
)

export default Restaurant;
