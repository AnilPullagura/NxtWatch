import {formatDistanceToNow} from 'date-fns'

import {Link} from 'react-router-dom'
import ThemeContext from '../Context'
import {MovieDiv, Channel} from './styledComponets'
import './index.css'

const MovieItem = props => {
  const {details} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel: {name, profileImageUrl},
    viewCount,
    publishedAt,
  } = details
  const formatted = new Intl.DateTimeFormat('en-CA').format(
    new Date(publishedAt),
  )
  const publishedDate = formatDistanceToNow(new Date(formatted), {
    addSuffix: true,
  })

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <Link className="movie-item-link" to={`/videos/${id}`}>
            <li className="movie-list-item">
              <MovieDiv isDarkTheme={isDarkTheme}>
                <img
                  className="thumbnail-img"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
                <div className="movie-item-bottom">
                  <div>
                    <img
                      className="channel-logo"
                      src={profileImageUrl}
                      alt="channel logo"
                    />
                  </div>
                  <div>
                    <p>{title}</p>
                    <Channel isDarkTheme={isDarkTheme}>{name}</Channel>
                    <Channel isDarkTheme={isDarkTheme}>
                      {viewCount}.{publishedDate}
                    </Channel>
                  </div>
                </div>
              </MovieDiv>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default MovieItem
