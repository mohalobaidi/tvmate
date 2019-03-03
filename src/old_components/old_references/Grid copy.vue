<template lang="pug">
.Grid(:style="'--columns:' + columns")
  transition(name="fade")
    .page(:key="page")
      vnodes(:vnodes="pages[page]")
  .pagination
    Icon(@click.native="prev") chevron_left
    Icon(@click.native="next") chevron_right
</template>

<script>
export default {
  name: 'Grid',
  props: ['columns', 'limit'],
  data() {
    return {
      page: 0,
      cells: []
    }
  },
  computed: {
    pages () {
      if ((this.limit | 0) < 1)
        return [this.cells]
      const limit = +this.limit
      let i = 0
      let pages = []
      while (i < this.cells.length) {
        let page = this.cells.slice(i, i + limit)
        pages.push(page);
        i += limit
      }
      return pages
    }
  },
  methods: {
    next () {
      this.page = Math.min(this.pages.length - 1, this.page + 1)
    },
    prev () {
      this.page = Math.max(0, this.page - 1)
    }
  },
  updated () {
    this.cells = this.$slots.default
    console.log(this.pages)
  },
  components: {
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Grid
  --columns: 6
  display: grid
  .page
    display: grid
    grid-column: 1
    grid-row: 1
    grid-template-columns: repeat(var(--columns), auto)
    grid-template-rows: repeat(4, 1fr)
    grid-column-gap: 24px
    grid-row-gap: 24px
    overflow: hidden
  .pagination
    height: 24px
    margin: 24px auto
    width: min-content
    white-space: nowrap
    .Icon
      margin: 0 12px
      font-size: 24px 
</style>