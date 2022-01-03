export async function fetchArtistsByCity(location) {
  // const response = await fetch(`https://musicbrainz.org/ws/2/artist?query=area:"${location.toLowerCase()}"&fmt=json`)
  const response = await fetch(`https://musicbrainz.org/ws/2/artist?query=artist:"the warlocks"&fmt=json`)
  const data = await response.json()
  // const result = data.artists.map((item) => item.name).sort((a, b) => a - b)
  console.log(data)
}
