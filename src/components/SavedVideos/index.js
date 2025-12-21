import {useState, useEffect} from 'react'
import {FaGamepad} from 'react-icons/fa'
import Header from '../Header'

import SavedVideoItem from '../SavedVideoItem'
import Sidebar from '../Sidebar'
import ThemeContext from '../Context'
import {NoVideosDiv} from './styledComponents'

import './index.css'

const SavedVideos = () => {
  const a = null

  const renderNovideos = () => (
    <div className="no-videos">
      <img
        className="no-videos-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved vidoes"
      />
      <h1>No Saved Videos Found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  const renderVideosList = () => (
    <ThemeContext.Consumer>
      {value => {
        const {savedVideos} = value
        return (
          <ul className="saved-list">
            {savedVideos.map(each => (
              <SavedVideoItem key={each.id} details={each} />
            ))}
          </ul>
        )
      }}
    </ThemeContext.Consumer>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, savedVideos} = value

        return (
          <div>
            <Header />
            <div className="saved-videos-container">
              <div className="mobile-Sidebar">
                <Sidebar />
              </div>
              <NoVideosDiv
                data-testid="savedVideos"
                isDarkTheme={isDarkTheme}
                className="videos-view-container"
              >
                <div className="saved-videos-head">
                  <FaGamepad className="game-pad" />
                  <h1 className="head">Saved Videos</h1>
                </div>
                {savedVideos.length > 0 ? renderVideosList() : renderNovideos()}
              </NoVideosDiv>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
