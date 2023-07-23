import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not">
        <img
          src="https://res.cloudinary.com/dl5aayinl/image/upload/v1690099017/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_ubyl6b.png"
          alt="not found"
        />
        <div className="hl">
          <h1 className="h11">Lost Your Way ?</h1>
          <p className="h11">
            we are sorry, the page you requested could not be found Please go
            back to the homepage.
          </p>
          <Link to="/" className="link">
            <button type="button" className="gth">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default NotFound
