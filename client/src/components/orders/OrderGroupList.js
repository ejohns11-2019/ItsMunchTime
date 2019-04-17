import React from 'react';
import { withRouter, } from 'react-router-dom';
import Order from './Order'
import axios from 'axios';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Header, Grid, Table, Button} from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import UserProfile from '../profile/UserProfile';


//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component{
  state = { orders: [],}
  
  toggleReset = () => {
    this.setState( state => {
      return {orders: [], }
    })
  }

  adminReset = () => {
    const { auth: { user, } } = this.props
    
    if (user.admin === true) {
      return(
        <>
        <Button size="medium" color="red" onClick={this.toggleReset}>Done</Button>
        </>
      )
    }
  }


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
    const { orders, } = this.state
    return(
    <>


      {/* <Grid>
        <Grid.Row>
          <Grid.Column width={6} floated='right'> */}
          
          <Grid>
            <Grid.Row>
            <Grid.Column width={8}>
             { 
               orders.map( (o) => {
        
                return(
                  <Order key={o.id} {...o}/>
                )
              
               })
            }
            </Grid.Column>
            <Grid.Column width={8}>
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
                 {/* {this.adminReset()} */}
                 </Grid.Column>
                 </Grid.Row>
                 </Grid>
                
          {/* </Grid.Column>
        </Grid.Row>
      </Grid> */}
          

    </>

    )
  }
}


export class ConnectedOrderList extends React.Component {
  render() {
    return(
      <AuthConsumer>
        { auth =>
            <OrderList {...this.props } {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedOrderList);

