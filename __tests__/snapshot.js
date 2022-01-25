import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'
import localArtists from '../__mocks__/artists.json'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useQuery = jest.spyOn(require('@apollo/client'), 'useQuery')

it('renders homepage unchanged', () => {
  useRouter.mockImplementationOnce(() => ({
    query: { search: 'eyJsb2NhdGlvbiI6InNhbHQgbGFrZSBjaXR5IiwiZGVjYWRlIjoiMjAxNyBUTyAyMDIyIn0=' },
  }))
  useQuery.mockImplementationOnce(() => ({ localArtists }))

  const tree = renderer.create(<Index />).toJSON()
  expect(tree).toMatchSnapshot()
})
