import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../Context'
import {SavedDiv} from './styledComponents'
import './index.css'
const SavedVideoItem = props => {
  const {details} = props
  const {name, id, publishedAt, thumbnailUrl, title, videoUrl, viewCount} =
    details
  const date = formatDistanceToNow(new Date(publishedAt))
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link className="saved-item-link" to={`/videos/${id}`}>
            <li>
              <SavedDiv isDarkTheme={isDarkTheme} className="video-list-item">
                <img
                  className="saved-list-img"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
                <div>
                  <h1 className="saved-title">{title}</h1>
                  <p className="saved-name">{name}</p>
                  <p className="trending-date">
                    {viewCount}.{date}
                  </p>
                </div>
              </SavedDiv>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default SavedVideoItem
