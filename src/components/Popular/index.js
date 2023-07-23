import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Popular extends Component {
  state = {popular: [], apistatus: apistatusConstants.initial}

  componentDidMount() {
    this.get()
  }

  getSuccess = data => {
    const Ori = data.results.map(each => ({
      id: each.id,
      title: each.title,
      PosterPath: each.poster_path,
      BackdropPath: each.backdrop_path,
    }))

    this.setState({popular: Ori})
  }

  getFailure = () => {
    this.setState({apistatus: apistatusConstants.failure})
  }

  get = async () => {
    this.setState({apistatus: apistatusConstants.loading})
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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

  SuccessView = () => {
    const {popular} = this.state
    return (
      <div>
        <ul className="ul">
          {popular.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id} className="link">
              <li key={each.id} className="li">
                <img src={each.PosterPath} alt={each.title} className="pop" />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="Home">
        <Header />
        {this.Finale()}
        <Footer />
      </div>
    )
  }
}
export default Popular
