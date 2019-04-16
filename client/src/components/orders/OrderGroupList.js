import React from 'react';
import Order from './Order'
import axios from 'axios';
import { Header, Grid, Table, } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import UserProfile from '../profile/UserProfile';

//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component{
  state = {orders:[],}


  componentDidMount() {
    axios.get('/api/orders')
      .then( res => {
        this.setState({ orders: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }
  render(){
    const { orders,} = this.state
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
                      <Table.Cell>Test</Table.Cell>
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

export default OrderList;