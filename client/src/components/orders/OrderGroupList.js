import React from 'react';
import Order from './Order'
import axios from 'axios';
import { Header, Grid, Table, Button, } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import UserProfile from '../profile/UserProfile';
import { AuthConsumer } from '../../providers/AuthProvider';

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component{
  state = {orders:[], user: { id: ''}, order: { current: '', ticket: '', order_date: '', user_id: '', restaurtant_id: ''}}


  componentDidMount() {
    axios.get('/api/orders')
      .then( res => {
        this.setState({ orders: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  copyOrder = (id) => {
    // debugger
    axios.get(`/api/orders/${id}`)
      .then( res => {
        const { order: { ticket, order_date, restaurant_id} } = this.state
        const { user: {id} } = this.props.auth
        this.setState({ order: res.data })
        axios.post('/api/orders', {
          current: true ,
          ticket: { ticket },
          order_date: { order_date },
          user_id: {id},
          restaurant_id: { restaurant_id }
        })
        .catch( err => {
          console.log(err)
        })
      })
  }
  render(){
    const { orders, } = this.state
    
    return(
    <>
      

      {/* <Grid>
        <Grid.Row>
          <Grid.Column width={6} floated='right'> */}
          <Grid>
            <Grid.Column floated='right' width={5}>
            <Table celled color="red"> 
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Order</Table.HeaderCell>
                  <Table.HeaderCell>"I'll Order What They Ordered"</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
                {
                  orders.map( (o, i) => {
                    return(
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{o.user_id}</Table.Cell>
                      <Table.Cell>{o.ticket}</Table.Cell>
                      <Table.Cell><Button onClick={() => this.copyOrder(o.id)}>Click Here</Button></Table.Cell>
                  </Table.Row>
                </Table.Body>
                      
                      )
                    })
                  }
                 </Table>
                 </Grid.Column>
                 </Grid>
                
          {/* </Grid.Column>
        </Grid.Row>
      </Grid> */}
          
    </>

    )
  }
}

const ConnectedOrderList = (props) => (
  <AuthConsumer>
    { auth =>
      <OrderList { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedOrderList;
