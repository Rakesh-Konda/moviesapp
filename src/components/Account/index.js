import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import ContextForName from '../../Context/contextForName'
import './index.css'

class Account extends Component {
  Logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ContextForName.Consumer>
        {value => {
          const {username, password} = value
          const PassLength =
            password.length > 0 ? '*'.repeat(password.length) : ''
          console.log(username, PassLength)
          return (
            <div className="Home">
              <Header />
              <>
                <div className="av">
                  <h1 className="acc">Account</h1>
                  <hr className="hr" />
                  <div className="j">
                    <p className="mem">Member ship</p>
                    <p>{username}@gmail.com</p>
                  </div>
                  <div className="j">
                    <p>Password : </p>
                    <p className="ps"> {PassLength}</p>
                  </div>
                  <hr className="hr" />
                  <div className="j">
                    <p className="mem">Plan details </p>
                    <p>Premium </p>
                    <p className="hd">Ultra HD</p>
                  </div>
                  <div className="lob">
                    <button type="button" onClick={this.Logout} className="lo">
                      Logout
                    </button>
                  </div>
                </div>
              </>
              <Footer />
            </div>
          )
        }}
      </ContextForName.Consumer>
    )
  }
}
export default Account
