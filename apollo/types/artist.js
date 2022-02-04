import { gql } from '@apollo/client'

const Artist = gql`
  type Artist {
    spotifyId: String
    type: String
    musicBrainzId: String
    name: String
    followers: Followers
    disambiguation: String
    external_urls: ExternalUrls
    genres: [String]
    area: Area
    images: [Image]
  }

  type Followers {
    href: String
    total: Int
  }

  type ExternalUrls {
    spotify: String
  }

  type Image {
    height: Int
    width: Int
    url: String
  }

  type Area {
    type: String
    name: String
  }
`

export const ArtistInfo = gql`
  type ArtistInfo {
    count: Int
    offset: Int
    artists: [Artist]
  }

  ${Artist}
`;
