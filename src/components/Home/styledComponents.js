import styled from 'styled-components'

export const HomeDiv = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818 ' : '#f9f9f9')};
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#181818 ')};
`
export const SearchBox = styled.p`
  background-color: ${props =>
    props.isDarkTheme ? ' #424242' : 'transparent'};
`
export const InputBox = styled.input`
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#181818 ')};
`
