import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import ThemeContext from '../Context'
import {LoginContainer, Input, LoginBox} from './styledComponents'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isShow: false, err: ''}

  oonChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  ontogleshow = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    this.getApiCall(userDetails)
  }

  storeToken = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getApiCall = async userDetails => {
    const url = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.storeToken(data.jwt_token)
    } else {
      const data = await response.json()
      this.setState({err: data.error_msg})
    }
  }

  renderPasswordField = isDarkTheme => {
    const {isShow, password} = this.state
    return (
      <div className="field">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <Input
          isDarkTheme={isDarkTheme}
          value={password}
          onChange={this.onchangePassword}
          type={isShow ? 'text' : 'password'}
          id="password"
        />
      </div>
    )
  }

  renderUsernameField = isDarkTheme => {
    const {username} = this.state
    return (
      <div className="field">
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <Input
          isDarkTheme={isDarkTheme}
          value={username}
          onChange={this.oonChangeUsername}
          type="text"
          id="username"
        />
      </div>
    )
  }

  render() {
    const {err} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const loginLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <LoginContainer
              isDarkTheme={isDarkTheme}
              className="login-container"
            >
              <LoginBox isDarkTheme={isDarkTheme} className="login-box">
                <img className="login-logo" src={loginLogo} alt="logo" />
                <form onSubmit={this.submitForm}>
                  {this.renderUsernameField(isDarkTheme)}
                  {this.renderPasswordField(isDarkTheme)}
                  <div className="checkbox-box">
                    <input
                      type="checkbox"
                      onChange={this.ontogleshow}
                      id="checkbox"
                    />
                    <label htmlFor="checkbox">Show Password</label>
                  </div>
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                  {err.length > 0 ? <p className="err-msg">{err}</p> : ''}
                </form>
              </LoginBox>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Login
