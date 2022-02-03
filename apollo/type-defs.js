import { gql } from '@apollo/client'

export const typeDefs = gql`
  # artist types

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

  type ArtistInfo {
    count: Int
    offset: Int
    artists: [Artist]
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

  # user and signup types

  type User {
    id: ID!
    email: String!
    createdAt: Int!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input ArtistsInput {
    artists: [Artist]
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type SyncPayload {
    error: Boolean
    message: String
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    localArtists(location: String, decade: String, offset: Int, limit: Int): ArtistInfo
  }

  type Mutation {
    syncArtists(input: [ArtistsInput]!): SyncArtistPayload
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
