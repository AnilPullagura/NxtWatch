import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  setDarkTheme: () => {},
  savedVideos: [],
  setVideosTosave: () => {},
})
export default ThemeContext
