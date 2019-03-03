import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
 
const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  adapter: cache.adapter,
  params: {
    api_key: "36d46e4ed9e7625af72c964c250a6b57",
  }
})