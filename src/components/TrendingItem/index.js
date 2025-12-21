import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../Context'
import {TrendingDiv} from './styledComponents'
import './index.css'

const TrendingItem = props => {
  const {details} = props
  const {
    channel: {name},
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = details
  const date = formatDistanceToNow(new Date(publishedAt))
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link className="trending-item-link" to={`/videos/${id}`}>
            <li>
              <TrendingDiv
                isDarkTheme={isDarkTheme}
                className="trending-list-item"
              >
                <img
                  className="trending-list-img"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
                <div>
                  <h1 className="trending-title">{title}</h1>
                  <p className="trending-name">{name}</p>
                  <p className="trending-date">
                    {viewCount}.{date}
                  </p>
                </div>
              </TrendingDiv>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default TrendingItem
