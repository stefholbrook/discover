import SpotifyWebApi from 'spotify-web-api-node'
import { MusicBrainzApi } from 'musicbrainz-api'
import PromiseThrottle from 'promise-throttle'
import process from 'process'

process.on('warning', (warning) => {
  console.warn(warning.name)    // Print the warning name
  console.warn(warning.message) // Print the warning message
  console.warn(warning.stack)   // Print the stack trace
})

const promiseThrottle = new PromiseThrottle({ requestsPerSecond: 5 })


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

const mbApi = new MusicBrainzApi({
  appName: 'daemo-test',
  appVersion: '0.1.0',
  appContactInfo: process.env.APP_CONTACT
})

let tokenRefreshInterval

const fetchToken = () => {
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
}

const searchArtists = async (name) => {
  try {
    const response = await spotifyApi.searchArtists(name, { limit: 1 })

    return response.body.artists.items

  } catch (error) {
    console.error(error)
  }
}

const dataFromList = async (artistsList) => {
  const list = await Promise.all(artistsList.map(async (artist) => {
    try {
      const result = await promiseThrottle.add(async () => await searchArtists(artist.name))

      return Object.assign({ ...artist }, { ...result[0] })
    } catch (error) {
      console.log(error)
    }
  }))

  return Promise.resolve(list)
}

export async function fetchArtistsByArea(location = 'los angeles', decade = '2000 TO 2022', offset = 0, limit = 10) {
  if (!tokenRefreshInterval) {
    // refresh token every hour
    tokenRefreshInterval = setInterval(fetchToken, 1000 * 60 * 60)
    fetchToken()
  }

  // `https://musicbrainz.org/ws/2/artist?query=area:"${location.toLowerCase()}" AND begin:[2000 TO 2022] AND ended:"false"&limit=10&offset=5&fmt=json`
  const query = `area:"${location.toLowerCase()}" AND begin:[${decade}] AND ended:"false"`
  const data = await mbApi.searchArtist(query, offset, limit)
  const artistData = (await dataFromList(data.artists)).filter((artist) => artist !== null)

  return { count: data.count, offset: data.offset, artists: artistData }
}
