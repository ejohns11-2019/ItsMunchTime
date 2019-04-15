import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null, restaurant: null, order: null };

  handleRegister = (user, history) => {
    axios.post("/api/auth", user)
      .then( res => {
        this.setState({ user: res.data, });
        history.push("/");
      })
    .catch( res => {
      console.log(res);
    })
  }

  handleLogin = (user, history) => {
    axios.post("/api/auth/sign_in", user)
      .then( res => {
        this.setState({ user: res.data.data, });
        history.push("/");
      })
      .catch( res => {
        console.log(res);
      })
  }

  handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
      .then( res => {
        this.setState({ user: null, });
        history.push('/login');
      })
      .catch( res => {
        console.log(res);
      })
  }

  updateUser = (id, user) => {
    let data = new FormData();
    data.append('image', user.image);
    axios.put(`/api/users/${id}?first_name=${user.first_name}
    &last_name=${user.last_name}
    &email=${user.email}
    &group=${user.group}
    &allergies=${user.allergies}
    &exceptions=${user.exceptions}
    &admin=${user.admin}
    &image=${user.image}`, data)
      .then( res => this.setState({ user: res.data, }) )
  }

  getOrders = (id, cb) => {
    axios.get(`/api/users/${id}/orders`)
    .then( res => {
      this.setState({ order: res.data })
      cb()
      this.setRestaurant(res.data.restaurant_id)
    })
    .catch( err => {
      console.log(err);
    })
  }

  setRestaurant = (id) => {
    axios.get(`/api/restaurants/${id}`)
    .then( res => {
      this.setState( { restaurant: res.data } )
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        authenticated: this.state.user !== null,
        handleRegister: this.handleRegister,
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
        setUser: (user) => this.setState({ user, }),
        updateUser: this.updateUser,
        getOrders: this.getOrders,
        setRestaurant: this.setRestaurant,
      }}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
};
