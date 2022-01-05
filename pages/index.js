import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

const StyledArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 10px;
`
const StyledImage = styled.img`
  width: 200px;
  height: auto;
`

const LOCAL_ARTISTS_QUERY = gql`
  query LocalArtistsQuery($location: String!) {
    localArtists(location: $location) {
      count
      offset
      artists {
        id
        name
        area {
          type
          name
        }
        followers {
          total
        }
        disambiguation
        external_urls {
          spotify
        }
        genres
        images {
          url
        }
      }
    }
  }
`

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(LOCAL_ARTISTS_QUERY, {
    variables: { location: router.query.location }
  })
  const artists = data?.localArtists.artists

  if (error) return <p>{error.message}</p>

  if (data) {
    return (
      <StyledArtistContainer>
        {artists.map((artist) => {
          return (
            <StyledImage src={artist.images[0].url} />
          )
        })}
      </StyledArtistContainer>
    )
  }

  return <p>Loading...</p>
}

export default Index
