import { Component } from 'react'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { keyframes } from 'styled-components'

import Loader from './loader.js'

const StyledArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 10px;
  justify-content: center;
  justify-items: center;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: repeat(1, auto);
  }
`
const StyledSectionHeader = styled.div`
  margin: 60px 0;

  @media (max-width: 960px) {
    margin: 60px 20px;
  }
`
const StyledTitle = styled.h2`
  font-size: 32px;
`
const StyledSubtitle = styled.h2`
  color: var(--main-color);
  margin: 16px 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
`
const StyledArtist = styled.div`
  border: 1px solid var(--main-color);
  height: 480px;
  padding: 20px;
  @media (max-width: 960px) {
    max-width: 320px;
  }
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
const loading = keyframes`
  0%,
  100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`
const StyledLoadMore = styled.div`
  position: relative;
  display: inline-block;
	width: 80px;
	height: 80px;
	color: inherit;
	vertical-align: middle;
	pointer-events: none;
  margin: 150px;

	&:before,
	&:after {
    content: '';
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-color: var(--light-color);
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${loading} 2.0s infinite ease-in-out;
  }

  &:after {
    animation-delay: -1.0s;
  }
}
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
    const { artists, error, loading, loadingMore, query } = this.props
    // const hasError = !error || !!artists || !!artists?.length
    const spotifyArtists = artists && artists.filter((artist) => !!artist.images && !!artist.images.length && artist.followers.total <= 60000)
    // combine genres and remove duplicates
    // const genres = [...new Set(spotifyArtists.map((artist) => artist.genres).flat())]


    // if (hasError) return <StyledSubtitle>No results found for your search.</StyledSubtitle>

    return (
      <div>
        <StyledSectionHeader>
          <StyledTitle>Results</StyledTitle>
          <StyledSubtitle>Filters: {query?.location || 'los angeles'}, {query?.decade || '2000s'}</StyledSubtitle>
        </StyledSectionHeader>
        <Loader loading={!!loading}>
          <StyledArtistContainer onScroll={(event) => this.handleScroll(event)}>
            {spotifyArtists && spotifyArtists.map((artist, index) => {
              return (
                <StyledArtist key={index}>
                  <StyledSpotifyLogo href={artist.external_urls.spotify} target='_blank'>
                    <FontAwesomeIcon icon={faSpotify} size='2x' />
                  </StyledSpotifyLogo>
                  <StyledImage src={artist.images[0].url} />
                  <h4>{artist.name}</h4>
                  <p>Followers: {artist.followers.total}</p>
                  <p>{!!artist.genres.length && `Genres: ${artist.genres.slice(0, 3)}`}</p>
                </StyledArtist>
              )
            })}
            {loadingMore && <StyledLoadMore />}
          </StyledArtistContainer>
        </Loader>
      </div>
    )
  }
}

export default Feed
