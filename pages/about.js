import Link from 'next/link'
import styled from 'styled-components'

const StyledHero = styled.div`
  background-image: ${({ image }) => `linear-gradient(to top, rgba(0, 0, 0, 0.98) 50%, rgba(255, 255, 255, 0)), url(${image})`};
  background-position-y: inherit;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  padding: 40px 0;
  color: #fff;
`
const StyledSiteHeader = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 80px;

  @media (max-width: 960px) {
    padding: 0 20px;
  }
`
const StyledIntroContent = styled.div`
  margin-top: 90px;
`
const IntroDesc = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, .7);
  line-height: 1.6;
`
const StyledIntroTitle = styled.h1`
  font-size: 42px;
  margin: 14px 0;
`
// nav
const StyledHeader = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 12px;
  margin: 0 48px;
`
const StyledLogo = styled.img`
  display: flex;
  cursor: pointer;
  padding: 5px 5px;
  align-self: flex-start;
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

export default function About() {
  return (
    <>
      <StyledHero image='/images/swirls.jpeg'>
        <StyledHeader>
          <Link href='/' passHref>
            <StyledLogo src='/images/daemo_logo.png' />
          </Link>
          <StyledRightMenu>
            <StyledHeaderLink href="/about">About</StyledHeaderLink>
          </StyledRightMenu>
        </StyledHeader>
        <StyledSiteHeader>
          <StyledIntroContent>
            <IntroDesc>daemo.</IntroDesc>
            <StyledIntroTitle>Discover | The best music you've never heard.</StyledIntroTitle>
          </StyledIntroContent>
        </StyledSiteHeader>
      </StyledHero>
    </>
  )
}
