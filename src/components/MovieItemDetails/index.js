import {Component} from 'react'
import Cookies from 'js-cookie'
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

class MovieItemDetails extends Component {
  state = {
    OnPosterData: '',
    apistatus: apistatusConstants.initial,
    Genres: [],
    Audio: [],
    SimilarMovies: [],
    Rating: '',
    Budget: '',
  }

  componentDidMount() {
    this.get()
  }

  getSuccess = data => {
    const each = data.movie_details
    const D = {
      adult: each.adult,
      title: each.title,
      runtime: each.runtime,
      ReleaseDate: each.release_date,
      overview: each.overview,
      PosterPath: each.poster_path,
      BackdropPath: each.backdrop_path,
    }

    const genres = data.movie_details.genres.map(each1 => ({
      id: each1.id,
      name: each1.name,
    }))

    const aud = data.movie_details.spoken_languages.map(hlo => ({
      id: hlo.id,
      name: hlo.english_name,
    }))
    console.log(aud)

    const Rat = data.movie_details

    const rating = {
      rating: Rat.vote_average,
      ratingCount: Rat.vote_count,
    }

    console.log(rating)

    const Bud = {
      budget: data.movie_details.budget,
      ReleaseDate: data.movie_details.release_date,
    }
    console.log(Bud)

    const Sim = data.movie_details.similar_movies.map(e => ({
      title: e.title,
      PosterPath: e.poster_path,
      BackdropPath: e.backdrop_path,
      id: e.id,
    }))

    console.log(Sim)

    this.setState({
      OnPosterData: D,
      Genres: genres,
      Audio: aud,
      Rating: rating,
      Budget: Bud,
      SimilarMovies: Sim,
    })
  }

  getFailure = () => {
    this.setState({apistatus: apistatusConstants.failure})
  }

  get = async () => {
    this.setState({apistatus: apistatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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

  getDuration = data => {
    const minutes = data
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const formattedDuration = `${hours}h ${remainingMinutes}m`
    return formattedDuration
  }

  getCertificate = data => {
    if (data) {
      return <p className="pi cer n">A</p>
    }
    return (
      <div>
        <p className="pi cer n">U/A</p>
      </div>
    )
  }

  getYear = data => {
    if (data && typeof data === 'string') {
      const dateParts = data.split('-')
      if (dateParts.length >= 1) {
        const year = parseInt(dateParts[0])
        return year
      }
    }
    return null
  }

  BYear = data => {
    if (!data || typeof data !== 'string') {
      return null // Return null for invalid or missing data
    }

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dateParts = data.split('-')
    if (dateParts.length !== 3) {
      return null
    }
    const year = parseInt(dateParts[0])
    const month = parseInt(dateParts[1])
    const day = parseInt(dateParts[2])
    const dateObj = new Date(year, month - 1, day)
    const daySuffix =
      day >= 11 && day <= 13
        ? 'th'
        : ['st', 'nd', 'rd', 'th'][(day % 10) - 1] || 'th'
    const formattedDate = `${day}${daySuffix} ${
      months[dateObj.getMonth()]
    } ${year}`
    return formattedDate
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
    const {
      OnPosterData,
      SimilarMovies,
      Genres,
      Audio,
      Rating,
      Budget,
    } = this.state

    return (
      <>
        <div>
          <div className="ran">
            <img
              src={OnPosterData.BackdropPath}
              alt={OnPosterData.title}
              className="image"
            />
            <div className="names bb">
              <h1 className="ht">{OnPosterData.title}</h1>
              <div className="da">
                <p className="pi">{this.getDuration(OnPosterData.runtime)}</p>
                {this.getCertificate(OnPosterData.adult)}
                <p className="pi">{this.getYear(OnPosterData.ReleaseDate)}</p>
              </div>
              <p className="ht b">{OnPosterData.overview}</p>
              <button type="button" className="play">
                Play
              </button>
            </div>
          </div>
          <div className="ddd">
            <div>
              <h1 className="down z">Genres</h1>
              <ul className="ull">
                {Genres.map(each => (
                  <li key={each.id}>
                    <p className="pi">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="down z">Audio Available</h1>
              <ul className="ull">
                {Audio.map(each => (
                  <li key={each.id}>
                    <p className="pi">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="re">
              <h1 className="down z">Rating Count</h1>
              <p className="pi o">{Rating.ratingCount}</p>
              <h1 className="down z">Rating Average</h1>
              <p className="pi o">{Rating.rating}</p>
            </div>
            <div className="re">
              <h1 className="down z">Budget</h1>
              <p className="pi o">{Budget.budget}</p>
              <h1 className="down z">Release Date</h1>
              <p className="pi o">{this.BYear(Budget.ReleaseDate)}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="pi oi z">More like this</h1>
          <div>
            <ul className="ul">
              {SimilarMovies.map(each => (
                <li key={each.id} className="li">
                  <img src={each.PosterPath} alt={each.title} className="pop" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    return (
      <div className="Home">
        <Header />
        {this.Finale()}
      </div>
    )
  }
}
export default MovieItemDetails
