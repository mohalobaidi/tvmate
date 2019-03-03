<template lang="pug">
.Pagination
  Grid(:cols="cols" :rows="_rows" :key="pageNumber")
    component(:is="type" v-if="placeholder && data.length == 0" v-for="(_, i) in Array(size)" :key="i")
    component(:is="type" v-for="c in page" v-bind="c" :key="c.id")
  PaginationBar(:page="pageNumber" :hide="hide" :total="total || 1" v-on:goto="goto")
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    data: { value: Array },
    type: { value: String },
    cols: { default: 3, value: Number },
    rows: { default: 12, value: Number },
    hide: { default: false, value: Boolean },
    placeholder: { value: Boolean },
  },
  data () {
    return {
      pageNumber: 1,
    }
  },
  computed: {
    page () {
      const n = this.pageNumber
      let start = this.size * (n - 1)
      let end   = this.size * n
      if (this.rows == 1)
        start = Math.min(start, this.data.length - this.size)
      return this.data.slice(start, end)
    },
    size () {
      return this.cols * this.rows
    },
    total () {
      return Math.ceil(this.data.length / this.size)
    },
    _rows () {
      if (this.total == 1)
        return Math.ceil(this.data.length / this.cols)
      return this.rows
    }
  },
  methods: {
    goto (n) {
      this.pageNumber = Math.max(Math.min(n, this.total), 1)
      if (this.pageNumber == this.total)
        this.$emit('loadMore')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Pagination
  width: 100%
  position: relative
  .Grid:nth-child(2)
    position: absolute
    top: 0
</style>