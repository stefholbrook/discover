import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import union from 'lodash.union'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

import Feed from '../components/feed.js'
import QueryForm from '../components/query-form.js'

const StyledHero = styled.div`
  background-image: ${({ image }) => `linear-gradient(to top, rgba(0, 0, 0, 0.8) 50%, rgba(255, 255, 255, 0)), url(${image})`};
  background-position-y: inherit;
  background-size: cover;
  background-attachment: inherit;
  background-repeat: no-repeat;
  padding: 40px 0 90px;
  color: #fff;
`
const StyledSiteHeader = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
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
const StyledContainer = styled.div`
  ${'' /* margin: 80px auto;
  max-width: 74em; */}
  margin: 0 auto;
  max-width: 74em;
  padding: 0 20px;
`

const LOCAL_ARTISTS_QUERY = gql`
  query LocalArtistsQuery($location: String!, $decade: String, $offset: Int, $limit: Int) {
    localArtists(location: $location, decade: $decade, offset: $offset, limit: $limit) {
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

  let { search } = router.query
  let query = search && JSON.parse(atob(search))

  const { data, error, fetchMore, refetch, loading } = useQuery(LOCAL_ARTISTS_QUERY, {
    variables: {
      location: query?.location || 'los angeles',
      decade: query?.decade || '2000 TO 2009',
      offset: 0,
      notifyOnNetworkStatusChange: true,
    },
    onCompleted: () => data && setArtists(data.localArtists.artists)
  })

  const loadMore = () => {
    if (data.localArtists.count === artists.length) return null
    const currentLength = artists.length

    console.log('count', data.localArtists.count)
    console.log('limit', limit)

    setLoadingMore(true)

    fetchMore({
      variables: {
        offset: currentLength,
        // limit
      },
    }).then((fetchMoreResult) => {
      // TODO: handle if limit is 100 or when data length === count
      // console.log(currentLength + fetchMoreResult.data.localArtists.artists.length)

      setLoadingMore(false)
      // merge `artists` with new results so it renders all previously fetched results
      setArtists(union(artists, fetchMoreResult.data.localArtists.artists))
      // MusicBrainz max limit is 100
      // setLimit(currentLength + fetchMoreResult.data.localArtists.artists.length)
    })
  }

  if (error) return <p>{error.message}</p>

  return (
    <>
        <StyledHero image='/images/swirls.jpeg'>
          <StyledSiteHeader>
            <StyledIntroContent>
            <IntroDesc>daemo.</IntroDesc>
            <StyledIntroTitle>Discover | The best music you've never heard.</StyledIntroTitle>
            <QueryForm artists={artists || []} refetch={() => refetch()} />
            </StyledIntroContent>
          </StyledSiteHeader>
        </StyledHero>
        <StyledContainer>

        <Feed
          artists={artists}
          onLoadMore={() => loadMore()}
          loadingMore={loadingMore}
          loading={loading}
          query={query}
        />
        </StyledContainer>
      </>
  )
}

export default Index
