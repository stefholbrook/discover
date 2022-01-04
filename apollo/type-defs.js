import { gql } from '@apollo/client'

export const typeDefs = gql`
  # artist types

  type Artist {
    id: ID
    name: String
    followers: Followers
    disambiguation: String
    external_urls: ExternalUrls
    genres: [String]
    area: Area
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

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    artists(location: String!): ArtistInfo
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
