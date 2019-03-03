<template lang="pug">
.Pane
  .header
    Icon(v-if="icon") {{icon}}
    .title {{title || 'Title'}}
    span(v-if="!icon")
    Icon expand_more
  .wrapper
    .content(v-if="content") {{content}}
    slot
</template>

<script>
export default {
  name: 'Pane',
  props: ['title', 'content', 'icon']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Pane
  margin: 24px 0 36px
  min-height: 56px
  .header
    display: grid
    grid-template-columns: min-content auto min-content
    grid-column-gap: 8px
    align-items: center
    font-size: 16px
    .title
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .Icon
      opacity: .7
  .wrapper
    margin: 12px 0
    .content
      font-size: 12px
      line-height: 18px
      text-align: justify
      opacity: .7
</style>