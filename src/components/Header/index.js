import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdOutlineMenu} from 'react-icons/md'
import 'reactjs-popup/dist/index.css'
import {LuLogOut} from 'react-icons/lu'
import {IoMdClose, IoIosMoon, IoMdSunny} from 'react-icons/io'

import {HeaderContainer, SideBarDiv} from './styledComponents'
import Sidebar from '../Sidebar'
import ThemeContext from '../Context'

import './index.css'

class Header extends Component {
  state = {isOpen: false}

  openSidebar = () => {
    this.setState({isOpen: true})
  }

  closeSidebar = () => {
    this.setState({isOpen: false})
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderMobileViewRoutes = isDarkTheme => {
    const {isOpen} = this.state
    const sidebarClassname = isOpen ? 'open' : ''
    const thmeClassForBurgerIcon = isDarkTheme ? 'dark-icon' : 'light-icon'
    return (
      <li>
        <button
          className="humburger-btn"
          isDarkTheme={isDarkTheme}
          type="button"
          onClick={this.openSidebar}
        >
          <MdOutlineMenu className={thmeClassForBurgerIcon} />
        </button>
        <SideBarDiv
          isDarkTheme={isDarkTheme}
          className={`sidebar ${sidebarClassname}`}
        >
          <button
            className="humburger-btn"
            type="button"
            onClick={this.closeSidebar}
          >
            <IoMdClose className={thmeClassForBurgerIcon} />
          </button>
          <Sidebar />
        </SideBarDiv>
      </li>
    )
  }

  renderNavelements = (isDarkTheme, setDarkTheme) => {
    const themeClassForIcons = isDarkTheme && 'darkTheme'
    const themeClassForlogoutBtn = isDarkTheme ? 'dark' : 'light'
    const themeClassForlogoutIcon = isDarkTheme ? 'dark-theme' : 'light-theme'
    const themeMoonIcon = isDarkTheme ? (
      <button
        onClick={() => setDarkTheme()}
        data-testid="theme"
        className="theme-btn"
        type="button"
      >
        <IoMdSunny className={`icons ${themeClassForIcons}`} />
      </button>
    ) : (
      <button
        onClick={() => setDarkTheme()}
        className="theme-btn"
        type="button"
        data-testid="theme"
      >
        <IoIosMoon className={`icons ${themeClassForIcons}`} />
      </button>
    )
    return (
      <ul className="nav-items-list">
        <li>{themeMoonIcon}</li>
        <li>
          <img
            className="profile-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
        </li>
        {this.renderMobileViewRoutes(isDarkTheme)}
        <li>
          <button
            onClick={this.logout}
            className="mobile-logout-icon"
            type="button"
          >
            <LuLogOut className={themeClassForlogoutIcon} />
          </button>
          <button
            onClick={this.logout}
            className={`${themeClassForlogoutBtn} large-screen-logout-icon`}
            type="button"
          >
            Log out
          </button>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, setDarkTheme} = value
          const logoThemeImg = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <HeaderContainer
              isDarkTheme={isDarkTheme}
              className="header-container"
            >
              <Link to="/">
                <img
                  className="logo-img"
                  src={logoThemeImg}
                  alt="website logo"
                />
              </Link>
              {this.renderNavelements(isDarkTheme, setDarkTheme)}
            </HeaderContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(Header)
