import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ContextForName from '../../Context/contextForName'
import './index.css'

class Login extends Component {
  state = {name: '', pass: '', ErrorMessage: '', showErrorMsg: false}

  Username = event => {
    this.setState({name: event.target.value})
  }

  password = event => {
    this.setState({pass: event.target.value})
  }

  getSuccess = data => {
    const {history} = this.props
    const token = data.jwt_token
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  getFailure = data => {
    const errorMsg = data.error_msg
    this.setState({ErrorMessage: errorMsg, showErrorMsg: true})
  }

  Submit = async (event, StoreUsernameAndPassword) => {
    event.preventDefault()
    const {name, pass} = this.state
    StoreUsernameAndPassword({name, pass})
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: name, password: pass}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.getSuccess(data)
    } else {
      this.getFailure(data)
    }
  }

  render() {
    const {ErrorMessage, showErrorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ContextForName.Consumer>
        {value => {
          const {StoreUsernameAndPassword} = value
          return (
            <div className="bg-image">
              <img
                src="https://res.cloudinary.com/dl5aayinl/image/upload/v1689837455/Group_7399_btgfi4.png"
                alt="login website logo"
                className="h1"
              />
              <div className="l">
                <form
                  className="login-card"
                  onSubmit={event =>
                    this.Submit(event, StoreUsernameAndPassword)
                  }
                >
                  <p className="p">Login</p>
                  <div className="inpfield">
                    <label htmlFor="username" className="lab">
                      USERNAME
                    </label>
                    <input
                      className="inp"
                      onChange={this.Username}
                      type="text"
                      id="username"
                      placeholder="rahul"
                    />
                  </div>
                  <div className="inpfield">
                    <label htmlFor="password" className="lab">
                      PASSWORD
                    </label>
                    <input
                      onChange={this.password}
                      className="inp"
                      type="password"
                      id="password"
                      placeholder="rahul@2021"
                    />
                  </div>
                  <button type="submit" className="lbut">
                    Login
                  </button>
                  {showErrorMsg && <p className="em">{ErrorMessage}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </ContextForName.Consumer>
    )
  }
}
export default Login
