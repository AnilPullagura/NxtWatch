import styled from 'styled-components'

export const VideoDiv = styled.div`
background-color:${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9 ')};
color:${props => (props.isDarkTheme ? '#f9f9f9' : '#0f0f0f')}
`
export const ViewsBox = styled.div`
color:${props => (props.isDarkTheme ? '#606060' : '#0f0f0f')}
`
