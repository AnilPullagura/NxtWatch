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
                  <h1 className="gaming-title">{title}</h1>
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
