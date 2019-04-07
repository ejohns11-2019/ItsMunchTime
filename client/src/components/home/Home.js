import React from 'react';
import { Header, Container, } from 'semantic-ui-react';
import OrderList from '../Order/OrderList';

const Home = () => (
  <Container>
  <Header as="h1" textAlign="center">Welcome to MunchTime!</Header>
  
  <OrderList />
  </Container>
)

export default Home;