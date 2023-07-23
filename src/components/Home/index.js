import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Trending from '../Trending'
import Originals from '../Originals'
import Footer from '../Footer'
import Poster from '../Poster'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {apistatus: apistatusConstants.initial}

  componentDidMount() {
    this.get()
  }

  get = async () => {
    this.setState({apistatus: apistatusConstants.loading})
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.setState({apistatus: apistatusConstants.success})
    } else {
      this.setState({apistatus: apistatusConstants.failure})
    }
  }

  Loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  Try = () => {
    this.get()
  }

  FailureView = () => (
    <div className="fail-view nn">
      <img
        src="https://res.cloudinary.com/dl5aayinl/image/upload/v1689922082/Background-Complete_gf0lkx.png"
        alt="failure view"
        className="fail"
      />
      <p className="fp">Something went wrong. Please try again</p>
      <button type="button" className="butf" onClick={this.Try}>
        Try Again
      </button>
    </div>
  )

  Finale = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apistatusConstants.success:
        return this.SuccessView()
      case apistatusConstants.failure:
        return this.FailureView()
      case apistatusConstants.loading:
        return this.Loader()
      default:
        return null
    }
  }

  SuccessView = () => (
    <div>
      <div>
        <Poster />
      </div>
      <div className="orig">
        <h1 className="poo z">Trending Now</h1>
        <Trending />
      </div>
      <div className="orig">
        <h1 className="pooo z">Originals</h1>
        <Originals />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )

  render() {
    const jwt = Cookies.get('jwt_token')
    if (jwt === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="Home">
        <Header />
        {this.Finale()}
      </div>
    )
  }
}
export default Home
