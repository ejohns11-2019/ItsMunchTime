import React from 'react';
import { withRouter, } from 'react-router-dom';
import Order from './Order'
import axios from 'axios';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Header, Grid, Table, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import UserProfile from '../profile/UserProfile';


//Logical component that will handle order display, and all order CRUD actions

class OrderList extends React.Component {
  state = { orders: [], editing: false, }

  toggleEdit = () => {
    this.setState(state => {
      return { editing: !state.editing, };
    })
  }

  toggleReset = () => {
    axios.put('/api/current_to_false', {current: false})

    // this.setState( state => {
    //   return {orders: [], }
    // })
  }

  adminReset = () => {
    const { auth: { user, } } = this.props

    if (user.admin === true) {
      return (
        <>
          <Button size="medium" color="red" onClick={this.toggleReset}>Done</Button>
        </>
      )
    }
  }


  componentDidMount() {
    axios.get('/api/current_orders')
      .then(res => {
        this.setState({ orders: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { orders, } = this.state
    return (
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
                </Table.Row>
              </Table.Header>
              {
                orders.map((o) => {
                  return (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>{o.last_name} </Table.Cell>
                        <Table.Cell>{o.ticket}</Table.Cell>
                      </Table.Row>
                    </Table.Body>

                  )
                })
              }
            </Table>
            {this.adminReset()}
          </Grid.Column>
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
    return (
      <AuthConsumer>
        {auth =>
          <OrderList {...this.props} {...this.state} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedOrderList);

