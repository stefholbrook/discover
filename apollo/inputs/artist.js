import { gql } from '@apollo/client'

export const ArtistInput = gql`
  input ArtistInput {
    spotifyId: String
    type: String
    musicBrainzId: String
    name: String
    followers: FollowersInput
    disambiguation: String
    external_urls: ExternalUrlsInput
    genres: [String]
    area: AreaInput
    images: [ImageInput]
  }

  input FollowersInput {
    href: String
    total: Int
  }

  input ExternalUrlsInput {
    spotify: String
  }

  input ImageInput {
    height: Int
    width: Int
    url: String
  }

  input AreaInput {
    type: String
    name: String
  }
`;
