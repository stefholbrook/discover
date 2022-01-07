import styled from 'styled-components'

const StyledArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  gap: 10px;
`
const StyledImage = styled.img`
  width: 200px;
  height: auto;
`

const handleScroll = ({ currentTarget }, onLoadMore) => {
  const { scrollTop, scrollHeight, clientHeight } = currentTarget

  console.log(scrollTop)
  console.log(scrollHeight)
  console.log(clientHeight)

  if ((scrollTop + clientHeight) >= scrollHeight) {
    console.log("suuuup")
    onLoadMore()
  }
}

export default function Feed({ artists, onLoadMore }) {
  return (
    <StyledArtistContainer>
      {artists && artists.map((artist, index) => {
        return (
          <StyledImage key={index} src={artist?.images[0].url} />
        )
      })}
      <button onClick={(event) => handleScroll(event, onLoadMore)}>moar</button>
    </StyledArtistContainer>
  )
}
