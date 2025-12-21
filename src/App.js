import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import ThemeContext from './components/Context'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import Notfound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: false, savedVideos: []}

  setDarkTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  setVideosTosave = newVideo => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, newVideo],
    }))
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          setDarkTheme: this.setDarkTheme,
          savedVideos,
          setVideosTosave: this.setVideosTosave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/Saved-videos" component={SavedVideos} />
          <Route component={Notfound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
