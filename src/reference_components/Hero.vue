<template lang="pug">
.Hero
  .title {{$lang.main.featured}}
  Grid(cols="2")
    Card(v-if="cards.length == 0" v-for="(_, i) in Array(2)" :key="i")
    Card(v-for="(card, i) in cards" v-bind="card" :key="i")
</template>

<script>
export default {
  name: 'Hero',
  props: ['cards']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Hero
  margin: 48px 0
  .title
    font-size: 32px
    padding: 48px 0 24px
  .Grid
    margin-bottom: 24px
</style>