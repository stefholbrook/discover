import { Component } from 'react'
import ReactPlaceholder from 'react-placeholder'
import { RectShape } from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'
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

  @media (max-width: 960px) {
    grid-template-columns: repeat(1, auto);
  }
`
const StyledSectionHeader = styled.div`
  margin: 60px 0;
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
const StyledGenrePill = styled.div`
  display: inline-flex;
  background: transparent;
  border: 1px solid var(--light-color);
  border-radius: 20px;
  padding: 8px;
  width: fit-content;
  margin: 8px;
`
const StyledArtist = styled.div`
  border: 1px solid var(--main-color);
  height: 480px;
  padding: 0px 20px;
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
const Loader = styled(RectShape)`

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
    const { artists, loading, loadingMore } = this.props
    const spotifyArtists = artists && artists.filter((artist) => !!artist.images && !!artist.images.length && artist.followers.total <= 60000)
    // combine genres and remove duplicates
    // const genres = [...new Set(spotifyArtists.map((artist) => artist.genres).flat())]
    const placeHolder = <RectShape style={{ width: 300, height: 480, backgroundColor: 'transparent', border: '1px solid var(--light-color)' }} rows={5} />

    return (
      <div>
        <StyledSectionHeader>
          <StyledTitle>Results</StyledTitle>
          <StyledSubtitle>Filters:</StyledSubtitle>
        </StyledSectionHeader>
        <ReactPlaceholder customPlaceholder={placeHolder} ready={!!loading} showLoadingAnimation rows={2}>
          <StyledArtistContainer onScroll={(event) => this.handleScroll(event, loadMore)}>
            {spotifyArtists && spotifyArtists.map((artist, index) => {
              return (
                <StyledArtist key={index}>
                  <StyledSpotifyLogo href={artist.external_urls.spotify} target='_blank'>
                    <FontAwesomeIcon icon={faSpotify} size='2x' />
                  </StyledSpotifyLogo>
                  <StyledImage src={artist.images[0].url} />
                  <h4>{artist.name}</h4>
                  <p>Followers: {artist.followers.total}</p>
                  <p>{!!artist.genres.length && `Genres: ${artist.genres}`}</p>
                </StyledArtist>
              )
            })}
            {loadingMore && 'loading....'}
          </StyledArtistContainer>
        </ReactPlaceholder>
      </div>
    )
  }
}

export default Feed
