import React, {Component} from 'react';
import axios from 'axios';
import {Item, Header,  Statistic, Icon} from 'semantic-ui-react';


class RestaurantDetails extends Component {

  state = {
    address: '',
    name: '',
    phone: '',
    menu: '',
    visitCounter: ''
  }

  componentDidMount() {
    const {restId, address, phone, menu, name } = this.props.location.state

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
    <Header size='huge'>{name}</Header>

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

    <Statistic>
      <Statistic.Label>Times Ordered: </Statistic.Label>
      <Statistic.Value>{ visitCounter }</Statistic.Value>
    </Statistic>

  <Header size='medium'> Menu: </Header>
    <Item.Group >
      <Item >
        <Item.Content verticalAlign='middle'> {menu}</Item.Content>
      </Item>
    </Item.Group>
    <br />
    </>
    )
  }
}

export default RestaurantDetails;
