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
const StyledInput = styled.input`
  background-color: transparent;
  color: var(--light-color);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  margin: 16px;
  padding: 8px;
  width: 'fit-content';

  @media (max-width: 960px) {
    margin-left: 0;
  }
`
const StyledSelect = styled.select`
  width: 150px;
  margin: 16px;
  margin-left: 0;
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
const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  opacity: ${({ disabled }) => disabled && '50%'};
`

export default function QueryForm({ refetch }) {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [decade, setDecade] = useState('')
  let errors = location.split(' ').join('').match(/[\W+\d+_]/g)

  const handleSubmit = (event) => {
    event.preventDefault()

    const query = { location, decade }

    router.push(`?search=${btoa(JSON.stringify(query))}`)
    return refetch({ variables: { location, decade } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledSelectLabel htmlFor='decade' />
      <StyledSelect
        id='decade'
        value={decade}
        placeholder='decade'
        onChange={(event) => setDecade(event.target.value)}
      >
        <option value='' disabled hidden>begin date</option>
        <option value='2020 TO 2021'>Last year</option>
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
        size='30'
        placeholder='search city, state, or country'
        onChange={(event) => setLocation(event.target.value)}
      />

      <StyledButton type='submit' disabled={!!errors}>
        <FontAwesomeIcon icon={faSearch} onClick={handleSubmit} />
      </StyledButton>
      {!!errors && <p>search cannot contain numbers or special characters.</p>}
    </form>
  )
}
