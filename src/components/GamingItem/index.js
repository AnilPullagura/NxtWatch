import {Link} from 'react-router-dom'
import ThemeContext from '../Context'
import {Views} from './styledComponents'
import './index.css'

const GameItem = props => {
  const {details} = props
  const {id, title, thumbnailUrl, viewCount} = details
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link className="gaming-item gaming-link" to={`/videos/${id}`}>
            <li>
              <div>
                <img
                  className="gaming-img"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
                <div className="gaming-bottom">
                  <p className="gaming-title">{title}</p>
                  <Views isDarkTheme={isDarkTheme}>
                    {viewCount} Watching Worlwide
                  </Views>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default GameItem
