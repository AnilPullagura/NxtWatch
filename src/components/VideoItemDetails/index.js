import ReactPlayer from 'react-player'
import {useState, useEffect, useContext} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdOutlinePlaylistAdd} from 'react-icons/md'
import ThemeContext from '../Context'
import LikeItem from './LikeItem'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {VideoDiv, ViewsBox} from './styledComponents'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const actionList = [
  {
    id: 1,
    icon: <BiLike />,
    text: 'Like',
  },
  {
    id: 2,
    icon: <BiDislike />,
    text: 'Dislike',
  },
]

const VideoItemDetails = props => {
  const [apiResponse, setResponse] = useState({
    videoDetails: {},
    apiStatus: apiConstants.initial,
  })
  const [isClickedId, setClickStatus] = useState('')
  const [isSaved, setSaveStatus] = useState(false)

  const {setVideosTosave} = useContext(ThemeContext)

  const getFormatData = data => {
    const updateData = {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subsCount: data.channel.subscriber_count,
      description: data.description,
      id: data.id,
      publishedAt: data.published_at,
      thumbnailUrl: data.thumbnail_url,
      title: data.title,
      videoUrl: data.video_url,
      viewCount: data.view_count,
    }
    return updateData
  }

  const getApicall = async () => {
    setResponse(prevState => ({...prevState, apiStatus: apiConstants.loading}))
    const {match} = props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const formatedData = getFormatData(data.video_details)
      setResponse({
        videoDetails: formatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      setResponse(prevState => ({
        ...prevState,
        apiResponse: apiConstants.failure,
      }))
    }
  }

  useEffect(() => {
    getApicall()
  }, [])

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
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              className="retry-btn"
              onClick={() => getApicall()}
              type="button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="skyblue" height="50" width="50" />
    </div>
  )

  const onchangeClick = newId => {
    setClickStatus(newId)
  }

  const onChangeStatus = () => {
    setSaveStatus(prevState => !prevState)
    setVideosTosave(apiResponse.videoDetails)
  }

  const renderLike = () => {
    const activeClassName = isSaved ? 'clicked' : 'like'
    return (
      <ul className="like-list">
        {actionList.map(each => (
          <LikeItem
            key={each.id}
            isActive={each.id === isClickedId}
            onchangeClick={onchangeClick}
            details={each}
          />
        ))}
        <li>
          <button
            onClick={onChangeStatus}
            className={` ${activeClassName} like-btn`}
            type="button"
          >
            <MdOutlinePlaylistAdd /> Save
          </button>
        </li>
      </ul>
    )
  }

  const renderSuccessView = () => {
    const {
      name,
      profileImageUrl,
      subsCount,
      description,
      publishedAt,
      title,
      videoUrl,
      viewCount,
    } = apiResponse.videoDetails

    const date = formatDistanceToNow(new Date(publishedAt))
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div className="video-main-container">
              <div className="player">
                <ReactPlayer
                  height="100%"
                  width="100%"
                  className="video-player"
                  url={videoUrl}
                  controls
                />
              </div>
              <h1 className="video-title">{title}</h1>
              <ViewsBox isDarkTheme={isDarkTheme} className="views-likes-box">
                <div className="views-box">
                  <p>{viewCount}</p>
                  <p>.{date}</p>
                </div>
                {renderLike()}
              </ViewsBox>
              <hr />
              <div className="channel-logo-box">
                <img
                  className="channel-logo-img"
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <div className="subs-box">
                  <p>{name}</p>
                  <p>{subsCount}</p>
                </div>
              </div>
              <p>{description}</p>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  const renderUI = () => {
    switch (apiResponse.apiStatus) {
      case apiConstants.loading:
        return renderLoadingView()
      case apiConstants.success:
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
          <div className="videoItem-container">
            <Header />
            <div className="video-item-main-container">
              <div className="sidebar-item-container">
                <Sidebar />
              </div>
              <VideoDiv
                isDarkTheme={isDarkTheme}
                data-testid="videoItemDetails"
                className="video-box"
              >
                {renderUI()}
              </VideoDiv>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default VideoItemDetails
