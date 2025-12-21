import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../Context'
import {NotFoundDiv} from './styledComponents'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notfoundClassname = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <div>
          <Header />
          <div className="not-found-container">
            <div className="not-found-sidebar">
              <Sidebar />
            </div>
            <NotFoundDiv
              isDarkTheme={isDarkTheme}
              className="not-found-main-container"
            >
              <img
                className="not-found-img"
                src={notfoundClassname}
                alt="failure view"
              />
              <h1>Page Not Found</h1>
              <p>We are sorry, the page you requested could not be found.</p>
            </NotFoundDiv>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default NotFound
