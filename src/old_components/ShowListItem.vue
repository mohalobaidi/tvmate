<template lang="pug">
.ShowListItem(v-on:click="onClick" :class="{large}")
  Poster(ratio="2:3" :src="poster")
  .details
    .title {{title}}
    .info 0 episodes - 0 Seasons
</template>

<script>
export default {
  name: 'ShowListItem',
  props: ['ids', 'title', 'poster', 'large'],
  methods: {
    onClick () {
      if (this.ids)
        this.$router.history.push('/show/' + this.ids.trakt)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ShowListItem
  padding: 6px 0
  display: grid
  grid-template-columns: 56px auto
  grid-template-rows: 1fr auto 1fr
  width: max-content
  .Poster
    grid-row: 1 / 4
  .details
    flex: 1
    padding: 0 12px
    grid-row: 2
    text-shadow: 0 1px 2px rgba(0, 0, 0, .5)
    .title
      font-size: 14px
    .info
      font-size: 12px
      color: #e0e0e0
  &.large
    grid-template-columns: 72px auto
    .title
      font-size: 24px 
</style>