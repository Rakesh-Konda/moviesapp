import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Originals extends Component {
  state = {Original: [], apistatus: apistatusConstants.initial}

  componentDidMount() {
    this.get()
  }

  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  getSuccess = data => {
    const Ori = data.results.map(each => ({
      id: each.id,
      title: each.title,
      PosterPath: each.poster_path,
      BackdropPath: each.backdrop_path,
    }))

    this.setState({Original: Ori})
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

  renderSlider = () => {
    const {Original} = this.state
    return (
      <Slider {...this.settings}>
        {Original.map(eachLogo => {
          const {id, PosterPath, BackdropPath} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`} className="link">
                <img
                  className="logo-image"
                  src={PosterPath}
                  alt={eachLogo.title}
                />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
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
    const {Original} = this.state
    return (
      <div>
        <div className="main-container">
          <div className="slick-container">{this.renderSlider()}</div>
        </div>
      </div>
    )
  }

  render() {
    return this.Finale()
  }
}
export default Originals
