import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import union from 'lodash.union'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

import Feed from '../components/feed.js'
import QueryForm from '../components/query-form.js'
import { get, insertRxArtists } from '../lib/artist/rxdb.js'

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
const StyledContainer = styled.div`
  margin: auto;
  max-width: 74em;
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

const LOCAL_ARTISTS_QUERY = gql`
  query LocalArtistsQuery($location: String!, $decade: String, $offset: Int, $limit: Int) {
    localArtists(location: $location, decade: $decade, offset: $offset, limit: $limit) {
      count
      offset
      artists {
        spotifyId
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

export default function Index() {
  const router = useRouter()
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

  const addArtists = async () => {
    const db = await get()

    await insertRxArtists(artists, db)
  }

  const loadMore = () => {
    if (data.localArtists.count === artists.length) return null

    const currentLength = artists.length

    setLoadingMore(true)

    fetchMore({
      variables: {
        offset: currentLength,
      },
    }).then((fetchMoreResult) => {
      setLoadingMore(false)
      // merge `artists` with new results so it renders all previously fetched results
      setArtists(union(artists, fetchMoreResult.data.localArtists.artists))
    })

    addArtists()
  }

  console.log(artists)

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
          error={error}
        />
      </StyledContainer>
    </>
  )
}
