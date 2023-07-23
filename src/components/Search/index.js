import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Search extends Component {
  state = {
    apistatus: apistatusConstants.initial,
    input: '',
    searchResults: [],
    showAll: false,
  }

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

    this.setState({searchResults: Ori})
  }

  getFailure = () => {
    this.setState({apistatus: apistatusConstants.failure})
  }

  get = async () => {
    this.setState({apistatus: apistatusConstants.loading})
    const {input} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${input}`
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

  InputValue = event => {
    this.setState({input: event.target.value})
  }

  GetResults = () => {
    this.setState({showAll: true}, this.get)
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
    const {input, searchResults, showAll} = this.state
    console.log(searchResults)
    const AreVideosThere = searchResults.length !== 0
    return (
      <div>
        {showAll && (
          <div>
            {AreVideosThere ? (
              <div>
                <ul className="ul">
                  {searchResults.map(each => (
                    <Link
                      to={`/movies/${each.id}`}
                      key={each.id}
                      className="link"
                    >
                      <li key={each.id} className="li">
                        <img
                          src={each.PosterPath}
                          alt={each.title}
                          className="pop"
                        />
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="fail-view">
                <img
                  src="https://res.cloudinary.com/dl5aayinl/image/upload/v1690093341/Group_7394_e4pwd5.png"
                  alt="no movies"
                  className="fail"
                />
                <p className="fp">
                  Your search for {input} did not find any matches.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  render() {
    const {input, searchResults, showAll} = this.state
    return (
      <div className="Home">
        <div className="Header">
          <div className="hlo">
            <div className="nav">
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
              <input
                type="search"
                value={input}
                className="inputs"
                onChange={this.InputValue}
              />
              <button
                type="button"
                testid="searchButton"
                className="ser"
                onClick={this.GetResults}
              >
                <HiOutlineSearch size={25} className="s cv" />
              </button>
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

        {this.Finale()}
      </div>
    )
  }
}
export default Search
