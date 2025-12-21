import styled from 'styled-components'

export const LoginContainer = styled.div`

background-color:${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
`
export const LoginBox = styled.div`
background-color:${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
color:${props => (props.isDarkTheme ? '#f9f9f9' : '#181818')};
`
export const Input = styled.input`
color:${props => (props.isDarkTheme ? '#f9f9f9' : '#181818')};
`
