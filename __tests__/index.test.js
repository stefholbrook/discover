/**
 * @jest-environment jsdom
 */

import React, { Fragment } from 'react'
import { shallow } from 'enzyme'
import localArtists from '../__mocks__/artists.json'
import Home from '../pages/index.js'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useQuery = jest.spyOn(require('@apollo/client'), 'useQuery')

describe('Home', () => {
  it('renders a heading', () => {
    useRouter.mockImplementationOnce(() => ({
      query: { search: 'eyJsb2NhdGlvbiI6InNhbHQgbGFrZSBjaXR5IiwiZGVjYWRlIjoiMjAxNyBUTyAyMDIyIn0=' },
    }))
    useQuery.mockImplementationOnce(() => ({ localArtists }))

    const render = shallow(<Home />)

    expect(render.find('div')).toBeTruthy()
  })
})
