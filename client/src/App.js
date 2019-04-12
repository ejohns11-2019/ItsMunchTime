import React, { Fragment, } from 'react';
import Home from './components/home/Home';
import NoMatch from './noMatch/NoMatch';
import Navbar from './shared/Navbar';
import Login from './shared/Login';
import Register from './shared/Register';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import FetchUser from './shared/FetchUser';
import ProtectedRoute from './shared/ProtectedRoute';
import Restaurants from "./components/restaurants/Restaurants"
import OrderFormAdmin from "./components/orders/OrderFormAdmin"
import Profile from './components/profile/Profile';
import RestaurantHistory from './components/restaurants/RestaurantHistory';


const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
    <Container>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/restaurants" component={Restaurants} />
        <ProtectedRoute exact path="/new_order" component={OrderFormAdmin} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/restaurant_history" component={RestaurantHistory} />
        <Route exact path="/register" component={Register} />

        <Route component={NoMatch} />
      </Switch>
    </Container>
    </FetchUser>
  </Fragment>
)

export default App;
