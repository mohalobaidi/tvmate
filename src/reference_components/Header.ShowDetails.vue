<template lang="pug">
.ShowHeader
  .title {{$lang.main.show_prefix + title}}
  .genres
    .genre(v-for="genre in genres") {{$lang.main[genre]}}
  .actions
    Button(icon="movie" @click.native="onClick" v-if="trailer") {{$lang.main.watch_trailer}}
</template>

<script>
export default {
  name: 'ShowHeader',
  props: ['title', 'genres', 'trailer'],
  methods: {
    onClick () {
      window.open(this.trailer, '_blank')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ShowHeader
  display: grid
  grid-template-columns: auto min-content
  grid-template-rows: auto auto
  padding: 72px 0 12px
  .title
    font-size: 32px
    grid-column: 1
    line-height: 48px
    min-height: 48px
    grid-row: 1
  .genres
    display: flex
    margin: 24px 0
    min-height: 28px
    grid-column: 1
    grid-row: 2
    .genre
      font-size: 12px
      padding: 4px 12px
      border: 1px solid #fff
      border-radius: 2px
      margin-right: 12px
      line-height: 18px
      opacity: .5
  .actions
    grid-column: 2
    grid-row: 1 / 3
    display: flex
    justify-content: flex-end
    flex-direction: column
</style>