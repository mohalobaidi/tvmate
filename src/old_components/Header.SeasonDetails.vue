<template lang="pug">
.ShowHeader
  .show-title(v-on:click="onClick") {{show_title}}
  .title {{title}}
  .actions
    // Button(icon="share") share
</template>

<script>
export default {
  name: 'ShowHeader',
  props: ['title', 'show_id', 'show_title', 'genres'],
  methods: {
    onClick () {
      this.$router.history.push(`/show/${this.show_id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ShowHeader
  display: grid
  grid-template-columns: auto min-content
  grid-template-rows: min-content auto
  .show-title
    font-size: 20px
    grid-column: 1
    line-height: 24px
    min-height: 24px
    grid-row: 1
    opacity: .7
    cursor: pointer
    &:hover
      opacity: 1
  .title
    font-size: 32px
    grid-column: 1
    line-height: 32px
    min-height: 32px
    opacity: .9
    grid-row: 2
    &:hover
      opacity: .9
  .actions
    grid-column: 2
    grid-row: 1 / 3
    display: flex
    justify-content: flex-end
    flex-direction: column
</style>