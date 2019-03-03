import axios from 'axios'

const trakt = axios.create({
	baseURL: 'https://api.trakt.tv',
	headers: {
		'Content-Type': 'application/json',
		'trakt-api-version': 2,
		'trakt-api-key': '26c7f4aa3fccaa438a97810ee6e8bf1746aa6dc786e7cf98563acdc8dcafb670'
	}
})

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: "36d46e4ed9e7625af72c964c250a6b57",
  }
})

const image = size => `https://image.tmdb.org/t/p/${size}`

const provider = {
	/*====*{ GET SHOWS }*==========================================================================*/
	getShows: async () => {
		const type = 'trending'
		const traktData = (await trakt(`/shows/trending`)).data
		const shows = type == 'trending' ? traktData.map(r => r.show) : traktData
		return shows.map(show => show.ids.trakt)
	},

	/*====*{ GET SHOW }*===========================================================================*/
	getShow: async id => {
		const traktData = (await trakt(`/shows/${id}`)).data
		const tmdbData  = (await tmdb(`/tv/${traktData.ids.tmdb}`)).data
		return {
			id: traktData.ids.trakt,
			title: traktData.title,
			episode_count: tmdbData.number_of_episodes,
			season_count: tmdbData.number_of_seasons,
			year: traktData.year,
			poster_url: image`w300` + tmdbData.poster_path,
			Backdrop_url: image`w500` + tmdbData.backdrop_path
		}
	},

	/*====*{ GET SHOW DETAILS }*===================================================================*/
	getShowDetails: async id => {
		const traktData = (await trakt(`/shows/${id}?extended=full`)).data
		const tmdbData  = (await tmdb(`/tv/${traktData.ids.tmdb}`)).data
		const first_aired = new Date(traktData.first_aired)
		return {
			overview: tmdbData.overview,
			trailer_url: 'https://www.example.com/',
			genres: traktData.genres,
			watchers: 99,
			plays: 99,
			comments: 99,
			lists: 99,
			rating: trakt.rating,
			status: traktData.status,
			episode_count: 24,
			aired: first_aired.getMonth() + '-' + first_aired.getFullYear(),
			certification: traktData.certification,
			seasons: tmdbData.seasons.map(season => ({
				number: season.season_number,
				title: season.name,
				overview: season.overview,
				poster_url: image`original` + season.poster_path,
			}))
		}
	},

	/*====*{ GET Season }*=========================================================================*/
	getSeason: async (id, num) => {
		const traktData = (await trakt(`/shows/${id}`)).data
		const tmdbData  = (await tmdb(`/tv/${traktData.ids.tmdb}/season/${num}`)).data
		return {
			show_id: id,
			number: num,
			title: tmdbData.name,
			overview: tmdb.overview,
			poster_url: image`original` + tmdbData.poster_path,
			episodes: tmdbData.episodes.map(episode => ({
				number: episode.episode_number,
				title: episode.name,
				overview: episode.overview,
				air_date: episode.air_date,
				stil_url: image`original` + episode.still_path,
			}))
		}
	},

}

export default provider