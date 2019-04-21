import React from 'react';
import { Header, Icon, Item } from 'semantic-ui-react';

const Contact = () => (
  <>
  <Header as='h1'>Contact Us</Header>

  <p>Devpoint Labs</p>
  <Item.Group>
    <Item icon>
      <Icon name = 'phone'/>
      <Item.Content verticalAlign='middle'>Phone: (801) 448-7240 </Item.Content>
    </Item>
  </Item.Group>
  <br />
</>
)


export default Contact;
