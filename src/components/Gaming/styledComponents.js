import styled from 'styled-components'

export const GamingDiv = styled.div`
background-color:${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
color:${props => (props.isDarkTheme ? '#f9f9f9' : '#0f0f0f')}
`
