export default function fetchCountries(searchQuery) {
  const queryParams = '?fields=name,capital,population,flags,languages'
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}${queryParams}`)
  .then(responce => responce.json())
}

