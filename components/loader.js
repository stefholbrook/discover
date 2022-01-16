import styled, { keyframes } from 'styled-components'

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 10px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: scroll;

  @media (max-width: 960px) {
    grid-template-columns: repeat(1, auto);
  }
`
const pulse = keyframes`
  0% {
    opacity: .6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .6;
  }
`
const StyledLoader = styled.div`
  width: 325px;
  height: 480px;
  background-color: transparent;
  border: 1px solid var(--light-color);
  animation: ${pulse} 1.5s infinite;
`

export default function Loader({ loading, children }) {
  if (loading) return (
    <StyledContainer>
      <StyledLoader />
      <StyledLoader />
      <StyledLoader />
      <StyledLoader />
      <StyledLoader />
      <StyledLoader />
    </StyledContainer>
  )

  return (
    <>
      {children}
    </>
  )
}
