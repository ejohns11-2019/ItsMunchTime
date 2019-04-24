import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom';


class Navbar extends React.Component {

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user !== null) {
      if (user.admin === true) {
        return (
          <Menu.Menu position='right' style={{backgroundColor: '#0f4c5c'}}>
            <Link to='/profile'>
            <Menu.Item
              name='My Profile'
              active={this.props.location.pathname === '/profile'}
            />
            </Link>
            <Link to='/profiles'>
            <Menu.Item
              name='All User Profiles'
              active={this.props.location.pathname === '/profiles'}
              
            />
            </Link>
            <Link to='/restaurants'>
            <Menu.Item
              name='Restaurants'
              active={this.props.location.pathname === '/restaurants'}
            />
            </Link>
            <Link to='/new_order'>
            <Menu.Item
              name='Create Order'
              active={this.props.location.pathname === '/new_order'}
            />
            </Link>
            <Menu.Item
              name='logout'
              onClick={ () => handleLogout(this.props.history) }
            />

          </Menu.Menu>
        )
      } else if (user) {
        return (
          <Menu.Menu position='right' style={{backgroundColor: '#0f4c5c'}}>
          <Link to='/profile'>
          <Menu.Item
            name='My Profile'
            active={this.props.location.pathname === '/profile'}
          />
          </Link>
          <Link to='/restaurants'>
          <Menu.Item
            name='Restaurants'
            active={this.props.location.pathname === '/restaurants'}
          />
          </Link>
          <Menu.Item
            name='logout'
            onClick={ () => handleLogout(this.props.history) }
          />
        </Menu.Menu>
        )
      }
    } else {
      return (
        <Menu.Menu position='right' style={{backgroundColor: '#0f4c5c'}}>
        <Link to='/login'>
          <Menu.Item
            id='login'
            name='login'
            active={location.pathname === '/login'}
          />
        </Link>
        <Link to='/register'>
          <Menu.Item
            id='register'
            name='register'
            active={location.pathname === '/register'}
          />
        </Link>
      </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <div>
        <Menu pointing secondary inverted style={{backgroundColor: '#0f4c5c'}}>
          <Link to='/'>
            <Menu.Item
              name='home'
              id='home'
              active={this.props.location.pathname === '/'}
            />
          </Link>
            { this.rightNavItems() }
        </Menu>
      </div>
    )
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);
