import { useState } from 'react'
import { useRouter } from 'next/router'
import union from 'lodash.union'
import { gql, useQuery } from '@apollo/client'

import Feed from '../components/feed.js'

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
  const [fetchCount, setFetchCount] = useState(0)
  const [artists, setArtists] = useState([])
  const { data, error, fetchMore } = useQuery(LOCAL_ARTISTS_QUERY, {
    variables: {
      location: router.query.location,
      offset: 0,
    },
    onCompleted: () => data && setArtists(data.localArtists.artists)
  })
  // let artists = artistsData.localArtists && artistsData.localArtists.artists

  const loadMore = () => {
    const currentLength = data.localArtists.artists.length

    fetchMore({
      variables: {
        offset: 10 * fetchCount,
        limit,
      },
    }).then((fetchMoreResult) => {
      // console.log('fetchmore', fetchMoreResult)
      // Update variables.limit for the original query to include
      // the newly added feed items.
      console.log(fetchMoreResult)

      setFetchCount(fetchCount++)
      setArtists(fetchMoreResult.data.localArtists.artists)
      setLimit(currentLength + fetchMoreResult.data.localArtists.artists.length);
    })
  }

  if (error) return <p>{error.message}</p>

  if (!!artists) {
    return (
      <>
        <Feed
          artists={artists}
          onLoadMore={() => loadMore()}
        />
      </>
    )
  }

  return <p>Loading...</p>
}

export default Index
