<template lang="pug">
  Layout(:background="backdrop")
    div(slot="side")
      Poster(ratio="2:3" :src="poster" :progress="progress")
      ShowInfo(:stats="stats")
      Button(v-if="!addedToLibrary" icon="bookmark" @click="addToLibrary") {{$lang.main.add_to_library}}
      Button.red(v-if="addedToLibrary" icon="bookmark"  @click="removeFromLibrary" :hoverMessage="$lang.main.remove_from_library")
        | {{$lang.main.added_to_library}}
      Pane(v-if="recommended.length != 0" :title="$lang.main.recommended" icon="stars")
        ShowListItem(v-for="show in recommended" v-bind="show")
    div(slot="main")
      ShowHeader(:title="title" :genres="genres" :trailer="trailer")
      Pane(:title="$lang.main.overview" icon="notes" :content="overview")
      Pane(:title="$lang.main.seasons" icon="list")
        Pagination(:data="seasons" cols="4" rows="2" type="Season")
      Pane(:title="$lang.main.cast_members" icon="people")
        Pagination(:data="cast" cols="6" rows="1" type="Profile")
</template>

<script>
import tvmate from '@/api'
import ShowHeader from '@/old_components/Header.ShowDetails'
import ShowInfo from '@/old_components/Info.ShowDetails'

export default {
  name: 'showDetails',
  data () {
    return {
      title:       '',
      genres:      [],
      overview:    '',
      poster:      '',
      backdrop:    '',
      stats:       {},
      recommended: [],
      seasons:     [],
      cast:        [],
      trailer:     '',
    }
  },
  methods: {
    addToLibrary () {
      this.$store.dispatch('addToLibrary', this.id)
    },
    removeFromLibrary () {
      this.$store.dispatch('removeFromLibrary', this.id)
    },
    // SeasonProgress ({number, episode_count}) {
    //   const show = this.$store.state.progress.find(show => show.id == this.id)
    //   if (!show) return false
    //   const season = show.data.find(season => season.id == number)
    //   if (!season) return false
    //   return season.data.length / episode_count
    // }
  },
  components: {
    ShowHeader,
    ShowInfo
  },
  computed: {
    id () {return this.$route.params.id},
    details () { return this.$store.getters.details(this.show) },
    addedToLibrary () {return this.$store.state.library.indexOf(this.id) != -1},
    progress () {
      const show = this.$store.state.progress.find(show => show.id == this.id)
      if (!show) return 0
      const progress = this.seasons.reduce((sum, {number, episode_count}) => {
        const season = show.data.find(season => season.id == number)
        if (!season) return sum
        return sum + season.data.length
      }, 0)
      return progress / this.stats.eps
    }
  },
  mounted () {
    this.$store.dispatch('getDetails', {id: this.id})
    tvmate.getShowDetails(this.id, this.$lang.current_lang).then(res => {
      this.title       = res.title
      this.genres      = res.genres
      this.overview    = res.overview
      this.poster      = res.poster
      this.backdrop    = res.backdrop
      this.stats       = res.stats
      this.seasons     = res.seasons
      this.cast        = res.cast
      this.trailer     = res.trailer
      this.recommended = res.recommended
      const translation = res.translations.translations.find(translation => {
        return translation.iso_639_1 == this.$lang.current_lang
      })
      this.overview = translation && translation.data.overview
    })
  }
}
</script>

<style lang="sass">
  .red
    background-color: rgba(#D32F2F, .5) !important
    border: 1px solid rgba(#B71C1C, .5) !important
    &:hover
      background-color: rgba(#F44336, .5) !important
      border: 1px solid rgba(#D32F2F, .5) !important
</style>
