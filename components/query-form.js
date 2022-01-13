import { useState } from 'react'
import { useRouter } from 'next/router'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const StyledIntroButton = styled.button`
  margin-top: 24px;
  border: 0;
  padding: 12px 18px;
  margin-right: 12px;
  border-radius: 4px;
  user-select: none;
  outline: 0;
  font-family: var(--title-font);
  font-weight: 500;
  background-color: transparent;
  color: var(--light-color);
  cursor: pointer;
  border: 1px solid #fff;
  min-width: 0px 50px;
`
// const StyledForm = styled.div`
//   display: inline-grid;
//   grid-template-columns: repeat(1, 25%);
// `
const StyledInput = styled.input`
  background-color: transparent;
  color: var(--light-color);
  border: 1px solid var(--light-color);
  border-radius: 4px;
  margin: 16px;
  padding: 8px;
  width: 150px;
`
const StyledSelect = styled.select`
  width: 150px;
  margin: 16px;
  padding: 8px;
  background-color: transparent;
  color: var(--light-color);
  border-radius: 4px;
`
const StyledSelectLabel = styled.label`
  margin-left: 16px;
  ${'' /* hide the label while keeping accessibility: */}
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto;
`

export default function QueryForm({ artists, refetch }) {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [genre, setGenre] = useState('genre')
  const [decade, setDecade] = useState('decade')

  const handleSubmit = (event) => {
    event.preventDefault()

    const query = { location, decade }

    router.push(`?search=${btoa(JSON.stringify(query))}`)
    return refetch({ variables: { location, decade } })

  }



  return (
    <form onSubmit={handleSubmit}>
      {/* <StyledSelectLabel htmlFor='genre' />
      <StyledSelect
        disabled={!genres.length}
        id='genre'
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      >
        <option value='genre' disabled hidden>genre</option>
        {genres.map((genre, index) => {
          return <option key={index} value={genre}>{genre}</option>
        })}
      </StyledSelect> */}


      <StyledSelectLabel htmlFor='decade' />
      <StyledSelect
        id='decade'
        value={decade}
        placeholder='decade'
        onChange={(event) => setDecade(event.target.value)}
      >
        <option value='decade' disabled hidden>decade</option>
        <option value='2021'>Last year</option>
        <option value='2017 TO 2022'>Last 5 years</option>
        <option value='2010 TO 2019'>2010s</option>
        <option value='2000 TO 2009'>2000s</option>
        <option value='1990 TO 1999'>1990s</option>
        <option value='1980 TO 1989'>1980s</option>
        <option value='1970 TO 1979'>1970s</option>
      </StyledSelect>


      <StyledSelectLabel htmlFor='search' />
      <StyledInput
        id='search'
        type='search'
        value={location}
        placeholder='search here'
        onChange={(event) => setLocation(event.target.value)}
      />

      <FontAwesomeIcon icon={faSearch} onClick={handleSubmit}>
        <button type='submit' />
      </FontAwesomeIcon>

      {/* <StyledIntroButton>Shuffle</StyledIntroButton>
      <StyledIntroButton>Radio</StyledIntroButton>
      <StyledIntroButton>Subscribe</StyledIntroButton> */}
    </form>
  )
}
