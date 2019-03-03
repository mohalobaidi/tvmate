<template lang="pug">
.Show(v-on:click="onClick" tabindex="0" v-on:keydown="e => {e.keyCode != 13 || onClick()}")
  Poster.poster(ratio="2:3" :src="poster" :id="id")
  .details
    .title {{title}}
    .number {{year}}
</template>

<script>
export default {
  name: 'Show',
  props: ['id', 'title', 'year', 'poster'],
  computed: {
    show () { return this.$store.getters.show(this.id)}
  },
  methods: {
    onClick () {
      if (this.id)
        this.$router.history.push('/show/' + this.id)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Show
  position: relative
  padding-bottom: 28px
  outline: none
  &:hover .Poster, &:focus .Poster
    transform: scale(1.05)
  &:focus .Poster
    box-shadow: 0 2px 8px rgba(0, 0, 0, .5), 0 0 48px rgba(255, 255, 255, .1)
  .Poster
    box-shadow: 0 2px 8px rgba(0, 0, 0, .5), 0 0 0 rgba(255, 255, 255, .2)
    transition: transform .2s ease-in-out, box-shadow .2s ease-in-out
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