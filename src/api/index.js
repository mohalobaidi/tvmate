import tmdb from './tmdb'
import trakt from './trakt'
import axios from 'axios'

const getTrendingShows = (p) => getShows('popular', p)

const getShows = (type, filters) => {
  let params = "limit=18"
  for (var key in filters) params += `&${key}=${filters[key]}`
  return trakt(`/shows/${type}?${params}`).then(async res => {
    const shows = type == 'trending' ? res.data.map(r => r.show) : res.data
    return await Promise.all(appendImages(shows))
  })
}

const searchFor = (query, filters) => {
  let params = "limit=18"
  for (var key in filters) params += `&${key}=${filters[key]}`
  return trakt(`/search/show?query=${query}&${params}`).then(async res => {
    const shows = res.data.map(r => r.show)
    return await Promise.all(appendImages(shows))
  })
}

const appendImages = shows => shows.map(async data => {
  if (data.ids.tmdb == null)
    return {id: data.ids.trakt, ...data}
  const images = await getShowImages(data.ids.tmdb)
  return {id: data.ids.trakt, ...data, ...images}
})


const getShowImages = (id) => tmdb(`/tv/${id}/images`).then(res => {
  const src      = 'https://image.tmdb.org/t/p/'

  const poster   = res.data.posters[0]   && `${src}w342${res.data.posters[0].file_path}`
  const backdrop = res.data.backdrops[0] && `${src}w780${res.data.backdrops[0].file_path}`
  return {poster, backdrop}
})

const getIds = (type, id) => trakt(`https://api.trakt.tv/search/${type}/${id}?type=show`)
  .then(res => res.data[0].show.ids)

const getRecommended = (id, limit = 6) =>
tmdb(`/tv/${id}/recommendations`).then(res => {
  const shows = res.data.results
  return Promise.all(shows.map(async show => ({
    ids: await getIds('tmdb', show.id),
    title: show.name,
    poster: 'https://image.tmdb.org/t/p/w342' + show.poster_path
  })).slice(0, limit))
})

const getTrailer = (ids) => tmdb(`/tv/${ids.tmdb}/videos`).then(res => {
  return 'https://youtube.com/watch?v=' + res.data.results[0].key
})

const appendStats = details =>
trakt(`/shows/${details.ids.trakt}/stats`).then(res => ({
  ...res.data,
  rating: details.rating.toFixed(1),
  status: details.status,
  eps: details.aired_episodes,
  month: new Date(details.first_aired).getMonth(),
  year: details.year,
  certification: details.certification
}))

const getShowExtraDetails = async (ids, lang) => {
  const res = await tmdb(`/tv/${ids.tmdb}?append_to_response=credits,translations&language=${lang}`)
  const src = 'https://image.tmdb.org/t/p/'
  return {
    poster:   `${src}w500${res.data.poster_path}`,
    backdrop: `${src}original${res.data.backdrop_path}`,
    translations: res.data.translations,
    seasons:res.data.seasons.map(season => ({
      show_id: ids.trakt,
      id:      season.id,
      number:  season.season_number,
      title:   season.name,
      episode_count: season.episode_count,
      year:    season.air_date && season.air_date.slice(0, 4),
      poster:  `${src}w342${(season.poster_path || res.data.poster_path)}`
    })).reverse(),
    cast: res.data.credits.cast.map(member => ({
      id:        member.id,
      name:      member.name,
      character: member.character,
      profile:   `${src}w200${member.profile_path}`
    }))
  }
}

const tvmate = {

  // Get Show Details
  getShowDetails: async (id, lang) => {
    const res = (await trakt(`shows/${id}?extended=full`)).data
    return {
      ids:      res.ids,
      title:    res.title,
      year:     res.year,
      genres:   res.genres,
      overview: res.overview,
      stats:       await appendStats(res),
      trailer:     await getTrailer(res.ids),
      recommended: await getRecommended(res.ids.tmdb),
      ...await getShowExtraDetails(res.ids, lang)
    }
  },

  // Get Season Details
  getSeasonDetails (ids, season) {
    return tmdb(`/tv/${ids.tmdb}/season/${season}`).then(res => {
      const src = 'https://image.tmdb.org/t/p/'
      return {
        title:    res.data.name,
        overview: res.data.overview,
        poster:   res.data.poster_path ? `${src}w500${res.data.poster_path}` : '',
        episodes: res.data.episodes.map(episode => ({
          id: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          number: episode.episode_number,
          still: episode.still_path ? `${src}w300${episode.still_path}` : ''
        }))
      }
    })
  },

  // Get Trending Shows
  getTrending (filters) { return getShows('trending', filters) },

  searchFor (query, filters) { return searchFor(query, filters) },

  getShows:  arr => Promise.all(arr.map(async id => {
    const res = (await trakt(`shows/${id}`)).data
    return {
      id:      res.ids.trakt,
      title:    res.title,
      year:     res.year,
      ...await getShowExtraDetails(res.ids)
    }
  })),

   // Get Today's Episodes
  getTodaysEpisodes () {
    return tmdb(`/tv/on_the_air`).then(res => {
      return Promise.all(res.data.results.map(show => {
        return tmdb(`/tv/${show.id}`)
      }))
    }).then(res => {
      return res.map(res => ({
        name: res.data.name,
        number: res.data.next_episode_to_air && res.data.next_episode_to_air.episode_number || "-",
        still: 'https://image.tmdb.org/t/p/w342/' + res.data.backdrop_path
      }))
    })
  },

  getGenres () {
    return trakt(`/genres/shows`)
  }

}

export default tvmate

// tmdb(`/tv/${id}`).then(res => {
//       const details = res.data
//       const title = details.name
//       const genres = details.genres.map(genre => genre.name)
//       const overview = details.overview
//       const poster_src = 'https://image.tmdb.org/t/p//' + details.poster_path
//       return {title, genres, overview, poster_src}
//     })