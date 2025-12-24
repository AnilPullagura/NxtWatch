import ThemeContext from '../Context'
import './index.css'
import {ViewsBox} from './styledComponents'

const LikeItem = props => {
  const {details, onchangeClick, isActive} = props
  const {text, icon, id} = details
  const changeClick = () => {
    onchangeClick(id)
  }
  const activeClassName = isActive ? 'clicked' : 'like'
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDatkTheme} = value
        return (
          <li>
            <button className="like-btn" type="button" onClick={changeClick}>
              <p className={` ${activeClassName} `}>{text}</p>
              <div className={`${activeClassName} `}>{icon}</div>
            </button>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default LikeItem
