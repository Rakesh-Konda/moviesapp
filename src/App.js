import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Account from './components/Account'
import Popular from './components/Popular'
import Search from './components/Search'
import NotFound from './components/NotFound'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ContextForName from './Context/contextForName'
import './App.css'

class App extends Component {
  state = {username: '', password: ''}

  StoreUsernameAndPassword = data => {
    this.setState({username: data.name, password: data.pass})
  }

  render() {
    const {username, password} = this.state
    console.log(username, password)
    return (
      <ContextForName.Provider
        value={{
          username,
          password,
          StoreUsernameAndPassword: this.StoreUsernameAndPassword,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route component={NotFound} />
        </Switch>
      </ContextForName.Provider>
    )
  }
}

export default App
