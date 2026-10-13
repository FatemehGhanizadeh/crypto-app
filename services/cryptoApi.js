const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = `CG-WS6N5JQVUtFPsRQBZS6mSjAX`;

const getCoins = (currency, pageNumber) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=20&page=${pageNumber}&locale=en&order=market_cap_desc&x-cg-demo-api-key=${API_KEY}`;

const getSearch=(search)=>`${BASE_URL}/search?query=${search}&x-cg-demo-api-key=${API_KEY}`
const getChart=(coinId)=>`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`

export {getCoins,getSearch,getChart}