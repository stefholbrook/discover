import styled from 'styled-components'

const StyledHeader = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 12px;
  margin: 0 48px;
`
const StyledLogo = styled.a`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 40px;
  height: 40px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid var(--main-color);
  padding: 5px 5px;
  align-self: flex-start;
  border-radius: 30px;
`
const StyledHeaderContainer = styled.div`
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`
const StyledHeaderLink = styled.a`
  display: flex;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  padding: 15px;
`
const StyledRightMenu = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
`
const StyledProfile = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 30px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid var(--main-color);
  padding: 5px 5px;
`

export default function Layout({ children }) {
  return (
    <>
      <StyledHeader>
        <StyledLogo href="#" />
        {/* <HeaderContainer>
          <HeaderLink href="#">Home</HeaderLink>
          <HeaderLink href="#">Explore</HeaderLink>
          <HeaderLink href="#">Feed</HeaderLink>
          <HeaderLink href="#">Search</HeaderLink>
        </HeaderContainer> */}
        <StyledRightMenu>
          <StyledHeaderLink href="/about">About</StyledHeaderLink>
        </StyledRightMenu>
      </StyledHeader>
      {children}
    </>
  )
}
