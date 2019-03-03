
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  library: [],
  progress: [],
  test: []
}

const mutations = {
  addToLibrary (state, payload) {
    state.library = [...state.library, payload]
  },
  removeFromLibrary (state, payload) {
    const library = [...state.library]
    const index = library.indexOf(payload)
    library.splice(index, 1)
    state.library = library
  },
  WatchEpisode (state, payload) {
    const progress = [...state.progress]

    const show = progress.find(show => show.id == payload[0])

    if (!show) {
      progress.push({id: payload[0], data: [{id: payload[1], data: [payload[2]]}]})
      state.progress = progress
      return true
    }

    const season = show.data.find(season => season.id == payload[1])

    if (!season) {
      show.data.push({id: payload[1], data: [payload[2]]})
      state.progress = progress
      return true
    }

    const episode = season.data.indexOf(payload[2])

    if (episode == -1) {
      season.data.push(payload[2])
      state.progress = progress
      return true
    }

    return false
  },

  UnwatchEpisode (state, payload) {
    const progress = [...state.progress]

    const show = progress.findIndex(show => show.id == payload[0])
    if (show == -1) return false

    const season = progress[show].data.findIndex(season => season.id == payload[1])
    if (season == -1) return false

    const episode = progress[show].data[season].data.indexOf(payload[2])
    if (episode == -1) return false

    progress[show].data[season].data.splice(episode, 1)

    if (progress[show].data[season].data.length == 0)
      progress[show].data.splice(season, 1)

    if (progress[show].data.length == 0)
      progress.splice(show, 1)

    state.progress = progress
    return true
  },
}

const actions = {
  addToLibrary (context, payload) {
    context.commit('addToLibrary', payload)
  },
  removeFromLibrary (context, payload) {
    context.commit('removeFromLibrary', payload)
  },
  WatchEpisode (context, payload) {
    context.commit('WatchEpisode', payload)
  },
  UnwatchEpisode (context, payload) {
    context.commit('UnwatchEpisode', payload)
  },
}

const plugins = [vuexLocal.plugin]
export default new Vuex.Store({state, mutations, actions, plugins: [vuexLocal.plugin]})