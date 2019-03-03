<template lang="pug">
.SideRating
  | My Rating
  .stars
    i.material-icons.star(
      v-for="val in [1, 2, 3, 4, 5]"
      v-on:click="changeSelected(val)"
      :class="selected == val ? 'selected' : ''"
      )
</template>

<script>
export default {
  name: 'SideRating',
  props: ['title', 'icon'],
  data () {
    return {
      selected: 1
    }
  },
  methods: {
    changeSelected (val) {
      this.selected = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.SideRating
  display: flex
  align-items: center
  justify-content: space-between
  font-weight: 500
  font-size: 16px
  margin: 24px 0
  .stars
    display: flex
    &:not(:hover) .star.selected ~ .star::before
      content: 'star_outline'
    .star
      padding: 0
      font-size: 18px
      color: #FBC02D
      position: relative
      &::before
        content: 'star'
      &:hover ~ .star::before
        content: 'star_outline'
</style>