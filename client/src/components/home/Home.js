import React from 'react';
import { Header, } from 'semantic-ui-react';
import Restaurants from "../restaurants/Restaurants";

const Home = () => (
  <div>
    <Header as="h3" textAlign="center">Devise Auth App</Header>
    <Restaurants/>
  </div>
)

export default Home;
