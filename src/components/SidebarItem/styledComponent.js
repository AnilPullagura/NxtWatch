import styled from 'styled-components'

const ListBtn = styled.button`
color:${props => (props.isDarkTheme ? '#f9f9f9' : '#181818 ')};
background-color:${props => (props.isDarkTheme ? '#181818 ' : '#f9f9f9')};
`
export default ListBtn
