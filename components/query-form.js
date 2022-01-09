import { useState } from 'react'
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
const StyledForm = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(1, 25%);
`
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
`

export default function QueryForm() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [decade, setDecade] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(search)
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledForm>
        <StyledSelectLabel htmlFor='genre'>Genre</StyledSelectLabel>
        <StyledSelect
          id='genre'
          value={genre}
          placeholder='genre'
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value='cool'>Cool</option>
          <option value='genre'>Genre</option>
        </StyledSelect>
      </StyledForm>
      <StyledForm>
        <StyledSelectLabel htmlFor='decade'>Decade</StyledSelectLabel>
        <StyledSelect
          id='decade'
          value=''
          placeholder='decade'
          onChange={(event) => setDecade(event.target.value)}
        >
          <option value='cool'>Last year</option>
          <option value='genre'>Last 5 years</option>
          <option value='genre'>2010s</option>
          <option value='genre'>2000s</option>
          <option value='genre'>1990s</option>
          <option value='genre'>1980s</option>
          <option value='genre'>1970s</option>
        </StyledSelect>
      </StyledForm>
      <StyledForm>
        <StyledSelectLabel htmlFor='search'>Search</StyledSelectLabel>
        <StyledInput
          id='search'
          type='search'
          onChange={(event) => {
            console.log(event.target.value)
            return setSearch(event.target.value)
          }}
        />
      </StyledForm>
      {/* <StyledIntroButton>Shuffle</StyledIntroButton>
      <StyledIntroButton>Radio</StyledIntroButton>
      <StyledIntroButton>Subscribe</StyledIntroButton> */}
    </form>
  )
}
