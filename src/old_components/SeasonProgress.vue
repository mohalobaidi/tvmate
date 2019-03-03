<template lang="pug">
.SeasonProgressItem
  .name {{title || 'Season Title'}}
  .episodes {{(watched || 0)}}/{{(total || 0)}}
  .progress(:style="'--percentage:' + progress + '%'")
  .remaining {{(total - watched || 0)}} remaining
</template>

<script>
export default {
  name: 'SeasonProgress',
  props: ['title', 'watched', 'total'],
  computed: {
    progress () {
      return  Math.round(Math.min(100 * this.watched / this.total, 100))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.SeasonProgressItem
  grid-template-columns: auto min-content
  grid-template-rows: auto auto auto
  display: grid
  margin: 8px 0
  overflow: hidden
  .name
    grid-column: 1
    grid-row: 1
    font-size: 14px
  .episodes
    grid-column: 2
    grid-row: 1
    font-size: 12px
    opacity: .7
    text-align: end
  .progress
    width: 100%
    max-width: 100%
    height: 4px
    grid-column: 1 / 3
    grid-row: 2
    background-color: #D32F2F
    overflow: hidden
    margin: 2px 0
    --percentage: 10%
    padding-inline-start: var(--percentage)
    &::after
      content: ''
      width: 100%
      height: 4px
      display: block
      background-color: #691717
  .remaining
    grid-column: 1 / 3
    grid-row: 3
    font-size: 10px
    opacity: .5
</style>

<!--(:style="'padding-left:' + (100 * watched / total) + '%'")-->