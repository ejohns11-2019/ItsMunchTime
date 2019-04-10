import React, { Component } from "react";
import { Card, Button, Icon } from "semantic-ui-react";

const Restaurant = ({name, address, phone, menu, id, deleteRestaurant }) => (
//import acct consum do value.username && do logic form react contextlecture
//if don't need state can remain presentational component
      <>
        <Card>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Description>
              Address: { address }
              Phone:  { phone }
            </Card.Description>
            <Card.Meta>
              Menu: { menu }
            </Card.Meta>
          </Card.Content>
        </Card>
        <Button
          icon
          color="red"
          size="tiny"
          onClick={ () => deleteRestaurant(id) }
          style={{ marginLeft: "15px", }}
        >
          <Icon name ="trash" />
        </Button>
      </>

)

export default Restaurant;
