import {Component} from 'react'

import ThemeContext from '../Context'
import {SidebarNavDiv} from './styledComponent'
import SidebarItem from '../SidebarItem'
import './index.css'

const sidebarNavList = [
  {
    id: 1,
    displayText: 'Home',
    icon: 'home',
    path: '/',
  },
  {
    id: 2,
    displayText: 'Trending',
    icon: 'fire',
    path: '/trending',
  },
  {
    id: 3,
    displayText: 'Gaming',
    icon: 'gampad',
    path: '/gaming',
  },
  {
    id: 4,
    displayText: 'Saved Videos',
    icon: 'playlist',
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
                <p>CONTACT US</p>
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
                      alt="linked in logo"
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
