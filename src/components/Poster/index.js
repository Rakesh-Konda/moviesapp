import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Poster extends Component {
  state = {randomMovieOnTop: '', apistatus: apistatusConstants.initial}

  componentDidMount() {
    this.get()
  }

  getSuccess = data => {
    const len = data.results.length
    const randomNumber = Math.floor(Math.random() * len)
    const randomMovie = data.results[randomNumber]
    console.log(randomMovie)
    this.setState({randomMovieOnTop: randomMovie})
  }

  getFailure = () => {
    this.setState({apistatus: apistatusConstants.failure})
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
      this.getSuccess(data)
    } else {
      this.getFailure()
    }
  }

  Loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  Try = () => {
    this.get()
  }

  FailureView = () => (
    <div className="fail-view">
      <img
        src="https://res.cloudinary.com/dl5aayinl/image/upload/v1689919672/alert-triangle_dnvqe8.png"
        alt="failure view"
        className="fail"
      />
      <p className="fp">Something went wrong. Please try again</p>
      <button type="button" className="butf" onClick={this.Try}>
        Try Again
      </button>
    </div>
  )

  SuccessView = () => {
    const {randomMovieOnTop} = this.state
    return (
      <div className="ran">
        <img src={randomMovieOnTop.backdrop_path} className="poster" />
        <div className="names">
          <h1 className="ht">{randomMovieOnTop.title}</h1>
          <p className="ht b">{randomMovieOnTop.overview}</p>
          <button type="button" className="play">
            Play
          </button>
        </div>
      </div>
    )
  }

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

  render() {
    return this.Finale()
  }
}
export default Poster
