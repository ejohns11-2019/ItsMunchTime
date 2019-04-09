import React from "react";
import { Card, } from "semantic-ui-react";

const Restaurant = ({name, address, phone, menu}) => (

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
      </>

)

export default Restaurant;
