<template lang="pug">
.Panel
  .header
    select(v-for="(dropdown, i) in dropdowns.left" v-on:change="e => $emit('ondropdownClick', 0, i, e.target.value)")
      option(value="") {{dropdown.default}}
      option(v-for="option in dropdown.options" :value="option.slug") {{option.name}}
    .right
      select(v-for="(dropdown, i) in dropdowns.right" v-on:change="e => $emit('ondropdownClick', 1, i, e.target.value)")
        option(value="") {{dropdown.default}}
        option(v-for="option in dropdown.options" :value="option.slug") {{option.name}}
  .wrapper
    .content(v-if="content") {{content}}
    slot
</template>

<script>
export default {
  name: 'Panel',
  props: ['title', 'content', 'dropdowns']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Panel
  margin: 24px 0 36px
  .header
    height: 48px
    display: flex
    font-size: 16px
    border-top: 1px solid rgba(255, 255, 255, .1)
    border-bottom: 1px solid rgba(255, 255, 255, .1)
    align-items: center
    select
      width: min-content
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 12px
      font-weight: 600
      line-height: 16px
      text-transform: uppercase
      margin: 0
      border: 0
    .dropdown
      display: flex
      align-items: center
      margin-right: 12px 
      .title
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        font-size: 12px
        font-weight: 600
        line-height: 16px
        text-transform: uppercase
      .Icon
        opacity: .7
        margin: 4px
    .right
      flex: 1
      display: flex
      justify-content: flex-end
      .dropdown
        margin-right: 0
        margin-left: 12px
  .wrapper
    margin: 48px 0
    .content
      font-size: 12px
      line-height: 18px
      text-align: justify
      opacity: .7
</style>