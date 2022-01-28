export const artistSchema = {
  version: 0,
  primaryKey: 'spotify_id',
  type: 'object',
  properties: {
    id: {
      type: ['string', 'null']
    },
    spotify_id: {
      type: ['string', 'null']
    },
    music_brainz_id: {
      type: 'object',
      properties: {
        id: {
          type: ['string', 'null']
        },
        type: {
          type: ['string', 'null']
        }
      }
    },
    name: {
      type: ['string', 'null']
    },
    images: {
      type: ['array', 'null'],
      items: {
        type: 'object',
        properties: {
          url: {
            type: ['string', 'null']
          }
        }
      }
    },
    external_urls: {
      type: ['object', 'null'],
      properties: {
        spotify: {
          type: ['string', 'null']
        }
      }
    },
    genres: {
      type: ['array', 'null'],
      items: {
        type: ['string', 'null']
      }
    },
    area: {
      type: ['object', 'null'],
      properties: {
        type: {
          type: ['string', 'null']
        },
        name: {
          type: ['string', 'null']
        }
      }
    },
    disambiguation: {
      type: ['string', 'null']
    },
    followers: {
      type: ['object', 'null'],
      properties: {
        total: {
          type: ['number', 'null']
        }
      }
    }
  },
  required: ['spotify_id']
}

/*
--- payload ----

{
id: '5HJ2kX5UTwN4Ns8fB5Rn1I',
  type: 'artist',
    'type-id': 'e431f5f6-b5d2-343d-8b36-72607fffb74b',
      score: 100,
        name: 'clipping.',
          'sort-name': 'clipping.',
            area: {
  id: '1f40c6e1-47ba-4e35-996f-fe6ee5840e62',
    type: 'City',
      'type-id': '6fd8f29a-3d0a-32fc-980d-ea697b69da78',
        name: 'Los Angeles',
          'sort-name': 'Los Angeles',
            'life-span': { ended: null }
},
'begin-area': {
  id: '1f40c6e1-47ba-4e35-996f-fe6ee5840e62',
    type: 'City',
      'type-id': '6fd8f29a-3d0a-32fc-980d-ea697b69da78',
        name: 'Los Angeles',
          'sort-name': 'Los Angeles',
            'life-span': { ended: null }
},
disambiguation: 'US experimental hip-hop',
  'life-span': { begin: '2009', ended: null },
tags: [
  { count: 2, name: 'electronic' },
  { count: 1, name: 'rap' },
  { count: 1, name: 'american' },
  { count: 1, name: 'hip-hop' },
  { count: 3, name: 'hip hop' },
  { count: 1, name: 'usa' },
  { count: 1, name: 'harsh noise' },
  { count: 2, name: 'industrial hip hop' },
  { count: 1, name: 'hip-hop/rap' },
  { count: 0, name: 'poggers' }
],
  external_urls: { spotify: 'https://open.spotify.com/artist/5HJ2kX5UTwN4Ns8fB5Rn1I' },
followers: { href: null, total: 196776 },
genres: [
  'alternative hip hop',
  'escape room',
  'experimental hip hop',
  'industrial hip hop'
],
  href: 'https://api.spotify.com/v1/artists/5HJ2kX5UTwN4Ns8fB5Rn1I',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab6761610000e5ebcc61b54c332a2c8baaaf375b',
        width: 640
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/ab67616100005174cc61b54c332a2c8baaaf375b',
        width: 320
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/ab6761610000f178cc61b54c332a2c8baaaf375b',
        width: 160
      }
    ],
      popularity: 50,
        uri: 'spotify:artist:5HJ2kX5UTwN4Ns8fB5Rn1I'
}

*/
