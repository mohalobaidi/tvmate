<template lang="pug">
.Episode.watched(v-on:click="onClick")
  Poster.poster(ratio="16:9" :src="still" :progress="progress")
  .details
    .title {{name}}
    .number EP. {{number}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Episode',
  props: ['name', 'still', 'number', 'show_id', 'season_number'],
  computed: {
    progress () {
      console.log('updated')
      const show = this.$store.state.progress.find(show => show.id == this.show_id)
      if (!show) return false
      const season = show.data.find(season => season.id == this.season_number)
      if (!season) return false
      return season.data.indexOf(this.number) != -1
    }
  },
  methods: {
    onClick () {
      if (this.progress)
        this.removeFromWatched()
      else
        this.addToWatched()
    },
    addToWatched () {
      const payload = [this.show_id, this.season_number, this.number]
      this.$store.dispatch('WatchEpisode', payload)
    },
    removeFromWatched () {
      const payload = [this.show_id, this.season_number, this.number]
      this.$store.dispatch('UnwatchEpisode', payload)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Episode
  position: relative
  padding-bottom: 28px
  .details
    width: 100%
    position: absolute
    bottom: 0
    display: grid
    padding-top: 12px
    align-items: center
    justify-content: space-between
    grid-template-columns: auto auto
    grid-column-gap: 4px
    .title
      font-size: 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .number
      font-size: 10px
      white-space: nowrap
      opacity: .7
</style>



<!--
<template lang="pug">
.Episode.watched(v-on:click="onClick")
  Poster.poster(ratio="16:9" :src="still" :progress="progress")
  .details
    .title {{name}}
    .number EP. {{number}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Episode',
  props: ['name', 'still', 'number', 'show_id', 'season_number'],
  computed: {
    progress () {
      console.log(this.$store.state)
      const show = this.$store.state.progress.find(show => show.id == this.show_id)
      if (!show) return false
      const season = show.seasons.find(season => season.id == this.season_number)
      if (!season) return false
      return season.episodes.indexOf(this.number) != -1
    }
  },
  watch: {
    '$store.state.test' () {
      console.log('test')
    }
  },
  methods: {
    onClick () {
      this.$store.dispatch('WatchEpisode', [this.show_id, this.season_number, this.number])
      console.log(this)
      this.$forceUpdate()
    },
    addToWatched () {
      this.$store.dispatch('WatchEpisode', this.id)
    },
    removeFromWatched () {
      this.$store.dispatch('removeFromLibrary', this.id)
    }
  }
}
</script>

</!-- Add "scoped" attribute to limit CSS to this component only --/>
<style lang="sass" scoped>
.Episode
  position: relative
  padding-bottom: 28px
  .details
    width: 100%
    position: absolute
    bottom: 0
    display: grid
    padding-top: 12px
    align-items: center
    justify-content: space-between
    grid-template-columns: auto auto
    grid-column-gap: 4px
    .title
      font-size: 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .number
      font-size: 10px
      white-space: nowrap
      opacity: .7
</style>


-->