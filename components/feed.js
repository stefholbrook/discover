import { Component } from 'react'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const StyledArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 10px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: scroll;
`
const StyledSectionHeader = styled.div`
  margin: 60px 0;
`
const StyledTitle = styled.h2`
  font-size: 32px;
`
const StyledSubtitle = styled.h2`
  color: var(--main-color);
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
`
const StyledArtist = styled.div`
  border: 1px solid var(--main-color);
  padding: 20px;
  cursor: pointer;
`
const StyledImage = styled.img`
  width: 320px;
  height: 320px;
`
const StyledSpotifyLogo = styled.a`
  position: relative;
  top: 306px;
  left: 16px;
  text-decoration: none;
  color: #1DB954;
`

class Feed extends Component {
  handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement

    if ((scrollTop + clientHeight) >= scrollHeight) {
      this.props.onLoadMore()
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { artists, loading } = this.props
    const spotifyArtists = artists.filter((artist) => !!artist.images && !!artist.images.length && artist.followers.total <= 60000)

    // TODO: loader, filters

    return (
      <div>
        <StyledSectionHeader>
          <StyledTitle>Songs</StyledTitle>
          <StyledSubtitle>See All</StyledSubtitle>
        </StyledSectionHeader>
        <StyledArtistContainer onScroll={(event) => this.handleScroll(event, loadMore)}>
          {spotifyArtists && spotifyArtists.map((artist, index) => {
            return (
              <StyledArtist key={index}>
                <StyledSpotifyLogo href={artist.external_urls.spotify}>
                  <FontAwesomeIcon icon={faSpotify} size='2x' />
                </StyledSpotifyLogo>
                <StyledImage src={artist.images[0].url} />
                <h5>{artist.name}</h5>
                <p>Followers: {artist.followers.total}</p>
              </StyledArtist>
            )
          })}
          {loading && 'loading....'}
        </StyledArtistContainer>
      </div>
    )
  }
}

export default Feed
