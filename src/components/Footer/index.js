import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="ff">
        <div className="ic">
          <FaGoogle className="icon" size={25} />
          <FaTwitter className="icon" size={25} />
          <FaInstagram className="icon" size={25} />
          <FaYoutube className="icon" size={25} />
        </div>
        <p className="icon">Contact Us</p>
      </div>
    )
  }
}
export default Footer
