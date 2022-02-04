import { gql } from '@apollo/client'
import { ArtistInfo } from './types/artist.js'
import { ArtistInput } from './inputs/artist.js'

export const typeDefs = gql`
  # artist types
  ${ArtistInfo}

  ${ArtistInput}

  type SyncArtistsPayload {
    error: Boolean
    message: String
  }

  type Query {
    localArtists(location: String, decade: String, offset: Int, limit: Int): ArtistInfo
  }

  type Mutation {
    syncArtists(artists: [ArtistInput]!): SyncArtistsPayload
  }
`;

