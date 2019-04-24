import React, { Fragment, } from 'react';
import './App.css';
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
import RestaurantHistory from './components/restaurants/RestaurantHistory';
import RestaurantDetails from './components/restaurants/RestaurantDetails';
import MyProfile from './components/profile/MyProfile';
import Profiles from './components/profile/Profiles';
import Footer from './shared/Footer';
import OrderFormUser from './components/orders/OrderFormUser';
import About from './components/about/About';
import Contact from './components/about/Contact';

const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
    <Container className='article'>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={MyProfile} />
        <ProtectedRoute exact path="/profiles" component={Profiles} />
        <ProtectedRoute exact path="/restaurants" component={Restaurants} />
        <ProtectedRoute exact path="/new_order" component={OrderFormAdmin} />
        <ProtectedRoute exact path="/new_order_user" component={OrderFormUser} />
        {/* <ProtectedRoute exact path="/order" component={Order} /> */}
        <ProtectedRoute exact path="/restaurant_history" component={RestaurantHistory} />
        <ProtectedRoute exact path="/restaurant_details" component={RestaurantDetails} />
        {/* <ProtectedRoute exact path="/order" component={Order} /> */}
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
    </FetchUser>
    <Footer />
  </Fragment>
)

export default App;
