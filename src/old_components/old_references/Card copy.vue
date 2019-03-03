<template lang="pug">
.Card(:style="'background-image: url(' + backdrop + ')'")
  .background
    img(:src="backdrop")
  .content(v-on:click="onClick")
    Poster(ratio="2:3" :src="poster" :id="id")
    .details
      .title {{title}}
      .info 0 episodes - 0 Seasons
</template>

<script>
export default {
  name: 'Card',
  props: ['id', 'title', 'backdrop', 'poster', 'id'],
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
.Card
  position: relative 
  width: 100%
  padding-top: 56.25%
  border-radius: 2px
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2), inset 0 0 1px  rgba(255, 255, 255, .5)
  background-image: linear-gradient(#49494b, #353537)
  background-position: center
  background-repeat: no-repeat
  background-size: 100%
  transition: margin .3s ease-in-out, padding .3s ease-in-out, width .3s ease-in-out
  cursor: pointer
  &:hover
    margin: calc(-16px * .5625) -16px
    width: calc(100% + 32px)
    padding-top: calc((100% + 32px) * .5625)
  &:hover .background
    transform: scale(1)
    opacity: 1
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
      height: auto
  .content
    display: grid
    position: absolute
    top: 0
    left: 0
    content: ''
    width: 100%
    height: 100%
    padding: 32px
    grid-template-columns: 72px auto
    align-items: flex-end
    justify-content: flex-start
    background-image: linear-gradient(rgba(23, 23, 23, 0) 25%, rgba(4, 4, 4, .2) 50%, rgba(23, 23, 23, .4) 75%)
    .Poster
      box-shadow: 0 2px 8px rgba(0, 0, 0, .5), inset 0 0 1px  rgba(255, 255, 255, .5)
    .details
      display: flex
      padding: 24px
      justify-content: center
      flex-direction: column
      .title
        font-size: 24px
      .info
        opacity: .7
        font-size: 12px
</style>