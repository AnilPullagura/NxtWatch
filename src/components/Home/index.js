import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Sidebar from '../Sidebar'
import Header from '../Header'
import {HomeDiv, SearchBox, InputBox} from './styledComponents'
import ThemeContext from '../Context'
import MovieItem from '../MovieItem'
import './index.css'

const apiConstant = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  intial: 'INITIAL',
}

class Home extends Component {
  state = {
    isShown: true,
    moiveList: [],
    apiStatus: apiConstant.intial,
    searchInput: '',
  }

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiConstant.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const respone = await fetch(url, options)
    if (respone.ok === true) {
      const data = await respone.json()
      const moviesData = this.formatData(data.videos)
      this.setState({apiStatus: apiConstant.success, moiveList: moviesData})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  formatData = data => {
    const updateData = data.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      channel: {
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      },
      viewCount: each.view_count,
      publishedAt: each.published_at,
    }))
    return updateData
  }

  changeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchResults = () => {
    this.setState({searchInput: ''})
    this.getApiCall()
  }

  retryApiCall = () => {
    this.setState({searchInput: ''}, this.getApiCall)
  }

  setBannerStatus = () => {
    this.setState({isShown: false})
  }

  renderBanner = () => {
    const {isShown} = this.state
    return (
      isShown && (
        <div data-testid="banner" className="banner-container">
          <div>
            <img
              className="banner-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <p className="banner-text">
              Buy Nxt Watch Premium Prepaid Plans With UPI
            </p>
            <button className="get-btn" type="button">
              GET IT NOW
            </button>
          </div>
          <button
            onClick={this.setBannerStatus}
            className="banner-close-btn"
            type="button"
            data-testid="close"
          >
            close
          </button>
        </div>
      )
    )
  }

  renderUI = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.loading:
        return this.renderLoadingView()
      case apiConstant.success:
        return this.renderSuccesView()
      case apiConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="skyblue" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const themeFailureImg = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="failure-container">
            <img
              className="failure-img"
              src={themeFailureImg}
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              className="retry-btn"
              onClick={() => this.getApiCall()}
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSuccesView = () => {
    const {moiveList} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const btnclass = isDarkTheme ? 'dark-btn' : 'light-btn'
          return (
            <div>
              <SearchBox className="searchInput" isDarkTheme={isDarkTheme}>
                <InputBox
                  onChange={this.changeInput}
                  isDarkTheme={isDarkTheme}
                  className="search-input"
                  type="search"
                />
                <button
                  onClick={this.searchResults}
                  className="search-btn"
                  data-testid="searchButton"
                  type="button"
                >
                  search
                </button>
              </SearchBox>
              {moiveList.length > 0 ? (
                <ul className="movie-list-view">
                  {moiveList.map(each => (
                    <MovieItem key={each.id} details={each} />
                  ))}
                </ul>
              ) : (
                <div className="no-results-container">
                  <img
                    className="no-results"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <h1>No Search Results Found</h1>
                  <p>Try different key words or remove search filter</p>
                  <button
                    type="button"
                    className="no-results-btn"
                    onClick={this.retryApiCall}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div>
              <Header />
              <div className="home-container">
                <div className="large-sidebar">
                  <Sidebar />
                </div>
                <HomeDiv
                  isDarkTheme={isDarkTheme}
                  className="main-container"
                  data-testid="home"
                >
                  {this.renderBanner()}
                  <div className="home-movie-container">{this.renderUI()}</div>
                </HomeDiv>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
