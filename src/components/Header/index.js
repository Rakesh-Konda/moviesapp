import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="hlo">
          <div className="nav">
            <ul className="ui">
              <li>hi</li>
              <li>hlo</li>
            </ul>
            <Link to="/" className="link">
              <img
                src="https://res.cloudinary.com/dl5aayinl/image/upload/v1689837455/Group_7399_btgfi4.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <Link to="/" className="link">
              <p className="pp">Home</p>
            </Link>
            <Link to="/popular" className="link">
              <p className="pp">Popular</p>
            </Link>
          </div>
          <div className="dd">
            <Link to="/search" className="link">
              <button type="button" testid="searchButton" className="ser">
                <HiOutlineSearch size={25} className="s" />
              </button>
            </Link>

            <Link to="/account" className="link">
              <img
                src="https://res.cloudinary.com/dl5aayinl/image/upload/v1689839460/Group_mpdeyb.png"
                alt="profile"
                className="profile"
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Header
