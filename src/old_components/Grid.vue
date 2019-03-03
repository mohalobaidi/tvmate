<template lang="pug">
transition-group.Grid(:style="style" tag="div")
  slot
</template>

<script>
export default {
  name: 'Grid',
  props: ['cols', 'rows', 'limit'],
  computed: {
    style () {
      let style = '--cols:' + (this.cols || 6)
      if (this.rows)
        style += ';grid-template-rows: repeat(' + this.rows + ', 1fr)'
      return style 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Grid
  display: grid
  grid-template-columns: repeat(var(--cols), auto)
  grid-column-gap: 24px
  grid-row-gap: 24px
</style>