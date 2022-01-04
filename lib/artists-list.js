import SpotifyWebApi from 'spotify-web-api-node'
import PromiseThrottle from 'promise-throttle'

const promiseThrottle = new PromiseThrottle({ requestsPerSecond: 5 })

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log('The access token expires in ' + data.body['expires_in'])
    console.log('The access token is ' + data.body['access_token'])

    spotifyApi.setAccessToken(data.body['access_token'])
  },
  function (err) {
    console.log('Something went wrong when retrieving an access token', err)
  }
)

const searchArtists = async (name) => {
  return promiseThrottle.add(async () => {
    try {
      const response = await spotifyApi.searchArtists(name, { limit: 1 })

      // console.log('Artists', response.body.artists.items)

      return response.body.artists.items

    } catch (error) {
      console.error(error)
    }
  })
}

const dataFromList = async (artistsList) => {
  const list = await Promise.all(artistsList.map(async (artist) => {
    try {
      const result = await searchArtists(artist.name)

      if (result[0].followers.total > 10000) return null

      return Object.assign({ ...artist }, { ...result[0] })
    } catch (error) {
      console.log(error)
    }
  }))

  return list
}

export async function fetchArtistsByCity(location) {
  const response = await fetch(`https://musicbrainz.org/ws/2/artist?query=area:"${location.toLowerCase()}" AND begin:[2000 TO 2022] AND ended:"false"&limit=100&fmt=json`)
  const data = await response.json()
  const result = { count: data.count, offset: data.offset, artists: dataFromList(data.artists) }

  return result
}