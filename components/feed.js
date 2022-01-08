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
const StyledArtist = styled.div`
  border: 1px solid var(--main-color);
  padding: 20px;
  cursor: pointer;
`
const StyledImage = styled.img`
  width: 320px;
  height: 320px;
`
const StyledSpotifyLogo = styled(FontAwesomeIcon)`
  position: relative;
  top: 306px;
  left: 16px;

`


class Feed extends Component {
  handleScroll = (event, loadMore) => {
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
    const { artists } = this.props
    const spotifyArtists = artists.filter((artist) => !!artist.images || !!artist.images.length)

    return (
      <StyledArtistContainer onScroll={(event) => this.handleScroll(event, loadMore)}>
        {spotifyArtists && spotifyArtists.map((artist, index) => {
          return (
            <StyledArtist key={index}>
              <StyledSpotifyLogo icon={faSpotify} size='2x' />
              <StyledImage src={(!!artist.images.length && artist.images[0].url) || 'https://metro.co.uk/wp-content/uploads/2014/09/ad_147066281.jpg?quality=90&strip=all'} />
              <h5>{artist.name}</h5>
              <p>Followers: {artist.followers.total}</p>
            </StyledArtist>
          )
        })}
      </StyledArtistContainer>
    )
  }
}

export default Feed
