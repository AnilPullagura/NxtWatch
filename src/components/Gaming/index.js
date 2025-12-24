import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ThemeContext from '../Context'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {GamingDiv} from './styledComponents'
import GamingItem from '../GamingItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  sucess: 'SUCCESS',
  failure: 'FAILURE',
}

const Gaming = () => {
  const [apiResponse, setList] = useState({
    gamingList: [],
    apiStatus: apiConstants.initial,
  })

  const getFormatData = videos => {
    const updatedData = videos.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      viewCount: each.view_count,
    }))
    return updatedData
  }

  const getApicall = async () => {
    setList(prevState => ({...prevState, apiStatus: apiConstants.loading}))
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatedData = getFormatData(data.videos)
      setList({
        gamingList: formatedData,
        apiStatus: apiConstants.sucess,
      })
    } else {
      setList(prevState => ({...prevState, apiStatus: apiConstants.failure}))
    }
  }

  useEffect(() => {
    getApicall()
  }, [])

  const retryApicall = () => {
    getApicall()
  }

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
            <button className="retry-btn" onClick={retryApicall} type="button">
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  const renderLoaderView = () => (
    <div className="gaming-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="skyblue" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    const gamesList = apiResponse.gamingList
    return (
      <ul className="content-container">
        {gamesList.map(each => (
          <GamingItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  const renderUI = () => {
    switch (apiResponse.apiStatus) {
      case apiConstants.loading:
        return renderLoaderView()
      case apiConstants.sucess:
        return renderSuccessView()
      case apiConstants.failure:
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
            <div className="gaming-container">
              <div className="gaming-sidebar">
                <Sidebar />
              </div>
              <GamingDiv
                data-testid="gaming"
                className="gaming-content-container"
                isDarkTheme={isDarkTheme}
              >
                <div className="gaming-icon-top">
                  <h1>Gaming</h1>
                </div>
                {renderUI()}
              </GamingDiv>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Gaming
