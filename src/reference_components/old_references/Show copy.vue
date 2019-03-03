<template lang="pug">
.Show(v-on:click="onClick")
  .background
    img(:src="backdrop")
  Poster.poster(ratio="2:3" :src="poster" :id="id")
  .details
    .title {{title}}
    .number {{year}}
</template>

<script>
export default {
  name: 'Show',
  props: ['id', 'title', 'year', 'poster', 'backdrop'],
  methods: {
    onClick () {
      if (this.id)
        this.$router.history.push('/show/' + this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Show
  position: relative
  padding-bottom: 28px
  &:hover .Poster
    transform: scale(1.05)
  &:hover .background
    transform: scale(1)
    opacity: 1
  .Poster
    transition: transform .2s ease-in-out
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
  .background
    transition: opacity .3s ease-in-out, transform 4s ease-out
    width: 100%
    overflow: hidden
    top: 0
    left: 0
    display: flex
    position: fixed
    z-index: -10
    opacity: 0
    transform: scale(1.05)
    justify-content: center
    align-items: center
    pointer-events: none
    &::after
      content: ''
      position: absolute
      display: block
      width: 100%
      height: 100%
      top: 0
      left: 0
      background-image: linear-gradient(180deg,rgba(0, 0, 0, .5) 0, #171717)
      background-size: cover
      background-position: center
    img
      width: 100%
</style>