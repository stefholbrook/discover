import { fetchArtistsByArea } from '../lib/fetch-artists.js'
import insertArtists from '../lib/artist/db.js'

export const resolvers = {
  Query: {
    async localArtists(_parent, args, _context, _info) {
      const artists = await fetchArtistsByArea(args.location, args.decade, args.offset, args.limit)

      return artists
    },
  },
  Artist: {
    spotifyId(parent, _args, _context, _info) {
      return parent.id
    },
    musicBrainzId(parent, _args, _context, _info) {
      return parent['type-id']
    }
  },
  Mutation: {
    async syncArtists(_parent, args, _context, _info) {
      const artists = args.artists

      try {
        await insertArtists(artists)

        return {
          error: false,
          message: null
        }
      } catch (error) {
        console.log(error)

        return {
          error: true,
          message: error
        }
      }
    }
  },
}
