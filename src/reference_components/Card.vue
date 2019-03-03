<template lang="pug">
.Card(:style="'background-image: url(' + backdrop + ')'")
  .content(v-on:click="onClick")
    ShowListItem(:title="$lang.main.show_prefix + (title || '')" :poster="poster" large)
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
  background-color: #333 
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2), inset 0 0 1px  rgba(255, 255, 255, .5)
  background-image: linear-gradient(#49494b, #353537)
  background-position: center
  background-repeat: no-repeat
  background-size: 100%
  cursor: pointer
  outline: none
  .content
    display: flex
    position: absolute
    top: 0
    left: 0
    content: ''
    width: 100%
    height: 100%
    padding: 32px
    align-items: flex-end
    justify-content: flex-start
    background-image: linear-gradient(rgba(23, 23, 23, 0) 25%, rgba(4, 4, 4, .2) 50%, rgba(23, 23, 23, .4) 75%)
</style>