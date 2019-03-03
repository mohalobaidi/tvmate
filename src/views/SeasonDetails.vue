<template lang="pug">
  Layout(:background="backdrop")
    aside(slot="side")
      Poster(ratio="2:3" :src="poster" :progress="progress")
    main(slot="main")
      SeasonHeader(:show_id="$route.params.id" :show_title="$lang.main.show_prefix + show_title" :title="title" :genres="genres")
      Pane(:title="$lang.main.season_overview" icon="notes" :content="overview")
      Pane(:title="$lang.main.episodes" icon="list")
        Pagination(:data="episodes" cols="3" rows="4" type="Episode")
</template>

<script>
import tvmate from '@/api'
import SeasonHeader from '@/old_components/Header.SeasonDetails'

export default {
  name: 'seasonDetails',
  data () {
    return {
      title:       '',
      show_title:  '',
      genres:      [],
      overview:    '',
      poster:      '',
      backdrop:    '',
      stats:       {},
      episodes:    [],
      recommended: [],
      seasons:     [],
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    season () {
      return this.$route.params.season
    },
    progress () {
      const show = this.$store.state.progress.find(show => show.id == this.id)
      if (!show) return false
      const season = show.data.find(season => season.id == this.season)
      if (!season) return false
      return season.data.length / this.episodes.length
    }
  },
  components: {
    SeasonHeader,
  },
  mounted () {
    let poster = ''
    tvmate.getShowDetails(this.id).then(res => {
      this.show_title  = res.title 
      this.genres      = res.genres
      this.overview    = this.overview || res.overview
      this.backdrop    = res.backdrop
      this.stats       = res.stats
      this.seasons     = res.seasons
      poster = res.poster
      return tvmate.getSeasonDetails(res.ids, this.season)
    }).then(res => {
      this.title       = res.title 
      this.overview    = res.overview || this.overview
      this.poster      = res.poster || poster
      this.episode_count = res.episode_count
      this.episodes    = res.episodes.map(episode => ({
        ...episode,
        show_id: this.id,
        season_number: this.season
      })).filter(eps => eps.air_date != null)
    })
  }
}
</script>