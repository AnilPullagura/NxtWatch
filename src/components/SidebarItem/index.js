import {Component} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../Context'
import ListBtn from './styledComponent'
import './index.css'

class SidebarItem extends Component {
  changeId = () => {
    const {changeCurentId, details} = this.props
    const {id} = details
    changeCurentId(id)
  }

  render() {
    const {details, isActive} = this.props
    const {icon, path, displayText} = details
    const toggleClass = isActive ? 'active' : ''

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <Link className={`${toggleClass} link `} to={path}>
              <li className="li">
                <ListBtn
                  onClick={this.changeId}
                  isDarkTheme={isDarkTheme}
                  type="button"
                  className="side-bar-item"
                >
                  <p className={toggleClass}>{displayText}</p>
                  <>{icon}</>
                </ListBtn>
              </li>
            </Link>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SidebarItem
