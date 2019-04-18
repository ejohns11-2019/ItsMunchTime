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

  state = { orders: [], user: { id: '' }, order: { current: '', ticket: '', order_date: '', user_id: '', restaurtant_id: '' } }

  toggleEdit = () => {
    this.setState(state => {
      return { editing: !state.editing, };
    })
  }

  toggleReset = () => {
    axios.put('/api/current_to_false', { current: false })

    this.componentDidMount()
  }

  adminReset = () => {
    const { auth: { user, } } = this.props

    if (user.admin === true) {
      this.setState({ visibility: true })
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
    // this.adminReset()
  }

  copyOrder = (id) => {
    // debugger
    axios.get(`/api/orders/${id}`)
      .then(res => {
        const { order: { ticket, order_date, restaurant_id } } = this.state
        const { user: { id } } = this.props.auth
        this.setState({ order: res.data })
        axios.post('/api/orders', {
          current: true,
          ticket: { ticket },
          order_date: { order_date },
          user_id: { id },
          restaurant_id: { restaurant_id }
        })
          .catch(err => {
            console.log(err)
          })
      })
  }


  render() {
    const { orders, } = this.state
    const { auth: { user } } = this.props

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              {
                orders.map((o) => {
                  return (
                    <Order key={o.id} {...o} />
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
                    <Table.HeaderCell>“I’ll Order What They Ordered”</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {
                  orders.map((o) => {
                    return (
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>{o.last_name} </Table.Cell>
                          <Table.Cell>{o.ticket}</Table.Cell>
                          <Table.Cell><Button onClick={() => this.copyOrder(o.id)}>Click Here</Button></Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    )
                  })
                }
              </Table>
              {user.admin && <Button size="medium" color="red" onClick={this.toggleReset}>Done</Button>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
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


