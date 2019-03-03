<template lang="pug">
.ShowInfo
  .stats
    .stat
      Icon visibility
      | {{stats.watchers | format}}
    .stat
      Icon play_circle_filled
      | {{stats.plays | format}}
    .stat
      Icon comment
      | {{stats.comments | format}}
    .stat
      Icon playlist_play
      | {{stats.lists | format}}
  .info
    .name {{$lang.main.rating}}
    .value {{(stats.rating || 0)}} /10
    .name {{$lang.main.status}}
    .value {{(stats.status || 'unknown')}}
    .name {{$lang.main.eps}}
    .value {{(stats.eps || 0)}}
    .name {{$lang.main.aired}}
    .value {{(stats.month || '0') | month}} {{(stats.year || '1970')}}
    .name {{$lang.main.age}}
    .value {{stats.certification}}
</template>

<script>
export default {
  name: 'ShowInfo',
  props: ['stats'],
  filters: {
    month (m) {
      switch (m) {
        case 0: return 'JAN'
        case 1: return 'FEB'
        case 2: return 'MAR'
        case 3: return 'APR'
        case 4: return 'MAY'
        case 5: return 'JUN'
        case 6: return 'JUL'
        case 7: return 'AUG'
        case 8: return 'SEP'
        case 9: return 'NOV'
        case 10: return 'OCT'
        case 11: return 'DEC'
      }
      return ''
    },
    format (num) {
      const si = [
        { val: 1, symbol: "" },
        { val: 1E3, symbol: "k" },
        { val: 1E6, symbol: "M" },
      ]
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i
      for (i = si.length - 1; i > 0; i--)
        if (num >= si[i].val)
          break
      return (num / si[i].val).toFixed(1).replace(rx, "$1") + si[i].symbol
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ShowInfo
  margin: 12px 0
  .stats
    display: flex
    justify-content: space-between
    .stat
      display: grid
      align-items: center
      font-size: 12px
      font-weight: 500
      grid-template-columns: repeat(2, auto)
      grid-column-gap: 6px
      .Icon
        font-size: 12px
        opacity: .7
  .info
    display: grid
    grid-template-columns: auto auto
    margin: 12px 0
    .name, .value
    font-size: 12px
    text-transform: uppercase
    .name
      opacity: .7
    .value
      text-align: end
</style>