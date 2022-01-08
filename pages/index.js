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
  const [loadingMore, setLoadingMore] = useState(false)
  const [artists, setArtists] = useState(null)
  const { data, error, fetchMore } = useQuery(LOCAL_ARTISTS_QUERY, {
    variables: {
      location: router.query.location,
      offset: 0,
    },
    onCompleted: () => data && setArtists(data.localArtists.artists),
  })

  const loadMore = () => {
    const currentLength = artists.length

    setLoadingMore(true)

    fetchMore({
      variables: {
        offset: currentLength,
        limit
      },
    }).then((fetchMoreResult) => {
      // TODO: handle if limit is 100 or when data length === count
      // console.log(currentLength + fetchMoreResult.data.localArtists.artists.length)

      setLoadingMore(false)
      // merge `artists` with new results so it renders all previously fetched results
      setArtists(union(artists, fetchMoreResult.data.localArtists.artists))
      // MusicBrainz max limit is 100
      setLimit(currentLength + fetchMoreResult.data.localArtists.artists.length)
    })
  }

  console.log(loadingMore)

  if (error) return <p>{error.message}</p>

  if (!!artists) {
    return (
      <StyledContainer>
        <Feed
          artists={artists}
          onLoadMore={() => loadMore()}
          loading={loadingMore}
        />
      </StyledContainer>
    )
  }

  return <p>Loading...</p>
}

export default Index
