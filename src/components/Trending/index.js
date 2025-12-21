import {useEffect, useState} from 'react'

import Cookies from 'js-cookie'
import {FaFireAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import TrendingItem from '../TrendingItem'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../Context'
import {TrendingDiv} from './styledComponents'
import './index.css'

const apiCostants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Trending = () => {
  const [trendingStatus, setStatus] = useState({
    apiStatus: apiCostants.initial,
    videoList: [],
  })

  const getformatData = data => {
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

  const getApicall = async () => {
    setStatus(prevState => ({...prevState, apiStatus: apiCostants.loading}))
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const videosData = getformatData(data.videos)
      setStatus(prevState => ({
        videoList: videosData,
        apiStatus: apiCostants.success,
      }))
    } else {
      setStatus(prevState => ({...prevState, apiStatus: apiCostants.failure}))
    }
  }

  useEffect(() => {
    getApicall()
  }, [])

  const retryTrendingApi = () => {
    getApicall()
  }

  const renderSucessView = () => (
    <div>
      <ul className="trending-list">
        {trendingStatus.videoList.map(each => (
          <TrendingItem key={each.id} details={each} />
        ))}
      </ul>
    </div>
  )

  const renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const themeFailureImg = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="trending-failure-container">
            <img
              className="trending-failure-img"
              src={themeFailureImg}
              alt="failure"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              className="retry-btn"
              onClick={retryTrendingApi}
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  const renderLoaderView = () => (
    <div className="trending-loading-view" data-testid="loader">
      <Loader type="ThreeDots" color="skyblue" height="50" width="50" />
    </div>
  )

  const renderUI = () => {
    switch (trendingStatus.apiStatus) {
      case apiCostants.loading:
        return renderLoaderView()
      case apiCostants.success:
        return renderSucessView()
      case apiCostants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div>
            <Header />
            <div className="trending-main-container">
              <div className="trending-side-bar">
                <Sidebar />
              </div>
              <TrendingDiv
                isDarkTheme={isDarkTheme}
                data-testid="trending"
                className="trending-videos-container"
              >
                <div className="trending-header">
                  <FaFireAlt className="trending-img" />
                  <h1>Trending</h1>
                </div>
                {renderUI()}
              </TrendingDiv>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Trending
