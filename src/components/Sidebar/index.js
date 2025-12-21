import {Component} from 'react'

import {IoMdHome} from 'react-icons/io'
import {FaFireAlt, FaGamepad, FaSlidersH} from 'react-icons/fa'

import ThemeContext from '../Context'
import {SidebarNavDiv} from './styledComponent'
import SidebarItem from '../SidebarItem'
import './index.css'

const sidebarNavList = [
  {
    id: 1,
    displayText: 'Home',
    icon: <IoMdHome />,
    path: '/',
  },
  {
    id: 2,
    displayText: 'Trending',
    icon: <FaFireAlt />,
    path: '/trending',
  },
  {
    id: 3,
    displayText: 'Gaming',
    icon: <FaGamepad />,
    path: '/gaming',
  },
  {
    id: 4,
    displayText: 'Saved Videos',
    icon: <FaSlidersH />,
    path: '/saved-videos',
  },
]

class Sidebar extends Component {
  state = {curentId: sidebarNavList[0].id}

  changeCurentId = newId => {
    this.setState({curentId: newId})
  }

  render() {
    const {curentId} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <SidebarNavDiv className="nav-div" isDarkTheme={isDarkTheme}>
              <ul className="sidebar-list">
                {sidebarNavList.map(each => (
                  <SidebarItem
                    isActive={curentId === each.id}
                    changeCurentId={this.changeCurentId}
                    details={each}
                    key={each.id}
                  />
                ))}
              </ul>
              <div>
                <p>Contact Us</p>
                <ul className="contact-list">
                  <li>
                    <img
                      className="contact-img"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                    />
                  </li>
                  <li>
                    <img
                      className="contact-img"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                    />
                  </li>
                  <li>
                    <img
                      className="contact-img"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linkedin logo"
                    />
                  </li>
                </ul>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </SidebarNavDiv>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Sidebar
