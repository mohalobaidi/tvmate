import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})


export default axios.create({
	baseURL: 'https://api.trakt.tv',
	adapter: cache.adapter,
	headers: {
		'Content-Type': 'application/json',
		'trakt-api-version': 2,
		'trakt-api-key': '26c7f4aa3fccaa438a97810ee6e8bf1746aa6dc786e7cf98563acdc8dcafb670'
	}
})