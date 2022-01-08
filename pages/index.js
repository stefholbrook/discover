import { useState } from 'react'
import { useRouter } from 'next/router'
import union from 'lodash.union'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

import Feed from '../components/feed.js'

const StyledContainer = styled.div`
  margin: 80px auto;
  max-width: 74em;
`

const LOCAL_ARTISTS_QUERY = gql`
  query LocalArtistsQuery($location: String!, $offset: Int, $limit: Int) {
    localArtists(location: $location, offset: $offset, limit: $limit) {
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
  const [limit, setLimit] = useState(10)
  // const [fetchCount, setFetchCount] = useState(0)
  const [artists, setArtists] = useState([])
  const { data, error, fetchMore } = useQuery(LOCAL_ARTISTS_QUERY, {
    variables: {
      location: router.query.location,
      offset: 0,
    },
    onCompleted: () => data && setArtists(data.localArtists.artists),
  })
  // let artists = data && data.localArtists.artists
  // let fetchCount = 0
  // console.log('data', data)

  const loadMore = () => {
    const currentLength = data && data.localArtists.artists.length

    fetchMore({
      fetchPolicy: "cache-first",
      variables: {
        offset: currentLength,
        limit
      },
    }).then((fetchMoreResult) => {
      // console.log('fetchmore', fetchMoreResult)
      // Update variables.limit for the original query to include
      // the newly added feed items.

      // fetchCount++
      console.log(fetchMoreResult.data.localArtists.artists)
      console.log('artists', artists)


      setArtists(union(data.localArtists.artists, fetchMoreResult.data.localArtists.artists))
      setLimit(currentLength + fetchMoreResult.data.localArtists.artists.length);
    })
  }

  if (error) return <p>{error.message}</p>

  if (!!artists) {
    return (
      <StyledContainer>
        <Feed
          artists={artists}
          onLoadMore={() => loadMore()}
        />
      </StyledContainer>
    )
  }

  return <p>Loading...</p>
}

export default Index
