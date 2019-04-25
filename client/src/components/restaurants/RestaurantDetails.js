import React, {Component} from 'react';
import axios from 'axios';
import {Item, Header,  Statistic, Icon, Grid, Segment, Image} from 'semantic-ui-react';
import Burger from '../../images/food/burger.jpg';
import Healthy from '../../images/food/healthy.jpg';
import Pizza from '../../images/food/pizza.jpg';
import Salad from '../../images/food/salad.jpg';
import Veggies from '../../images/food/veggies.jpg';
import Wrap from '../../images/food/wrap.jpg';


class RestaurantDetails extends Component {

  state = {
    address: '',
    name: '',
    phone: '',
    menu: '',
    visitCounter: '',
    randomImage: '',
  }

  componentDidMount() {
    const {restId, address, phone, menu, name } = this.props.location.state
    const imageArray = [Burger,Healthy,Pizza,Salad,Veggies,Wrap];
    const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];

    this.setState({randomImage: randomImage});

    axios.get('/api/restaurant_visit_counter', { params: { restaurant_id: restId } })
      .then(res => {
        this.setState({ visitCounter: res.data[0].count })
      })
      .catch(err => {
        console.log(err)
      });
      this.setState({
        name: name,
        address: address,
        phone: phone,
        menu: menu,
      })
  }

  render() {
    const { name, address, phone, menu, visitCounter} = this.state
    return(
    <>
    <br />
    <Segment raised>
    <Grid celled stackable>
      <Grid.Row textAlign="center">
        <Grid.Column width={5}>
          <Image src={this.state.randomImage} />
        </Grid.Column>
        <Grid.Column width={11}>
          <Header size='huge'>{name}</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={5}>
          <Header size='medium'> Contact Info: </Header>
          <Item.Group >
          <Item icon>
            <Icon name = 'location arrow'/>
            <Item.Content icon='phone' verticalAlign='middle'>Address: {address}</Item.Content>
          </Item>
          <Item icon>
            <Icon name = 'phone'/>
            <Item.Content verticalAlign='middle'>Phone: {phone}</Item.Content>
          </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={6} textAlign="center">
          <Statistic>
            <Statistic.Label>Times Ordered: </Statistic.Label>
            <Statistic.Value>{ visitCounter }</Statistic.Value>
          </Statistic>
        </Grid.Column>
        <Grid.Column width={5} textAlign="center">
          <Header size='medium'> Menu: </Header>
          <Item.Group >
            <Item >
            <center><a href={menu} target="_blank"><Item.Content verticalAlign='middle'> {menu}</Item.Content></a></center> 
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </Segment>
    <br />
    </>
    )
  }
}

export default RestaurantDetails;
