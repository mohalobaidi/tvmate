<template lang="pug">
.PaginationBar(:class="hide ? 'hide' : ''")
  Icon.left chevron_left
  .prev(:class="page <= 1 ? 'disable' : ''" v-on:click="$emit('goto', page - 1)") {{$lang.main.prev}}
  .spacer
  .num(v-if="page != 1" v-on:click="$emit('goto', 1)") 1
  .num(v-if="page > 3"  v-on:click="$emit('goto', page - 2)") ...
  .num(v-if="page > 2"  v-on:click="$emit('goto', page - 1)") {{page - 1}}
  .num.current {{page}}
  .num(v-if="page + 1 < total" v-on:click="$emit('goto', page + 1)") {{page + 1}}
  .num(v-if="page + 2 < total" v-on:click="$emit('goto', page + 2)") ...
  .num(v-if="page != total"    v-on:click="$emit('goto', total)") {{total}}
  .spacer
  .next(:class="page >= total ? 'disable' : ''" v-on:click="$emit('goto', page + 1)") {{$lang.main.next}}
  Icon.right chevron_right
</template>

<script>
export default {
  name: 'PaginationBar',
  props: ['page', 'hide', 'total']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.PaginationBar
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  position: relative
  font-size: 12px
  user-select: none
  margin-top: 24px
  &.hide .num
    display: none
  .num
    width: 32px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    opacity: .7
    &:hover
      opacity: 1
  .current
    cursor: inherit
    opacity: 1
    font-weight: 700
  .prev, .next
    display: flex
    align-items: center
    justify-content: center
    text-transform: uppercase
    line-height: 16px
    cursor: pointer
    opacity: .7
    &:not(.disable):hover
      opacity: 1
  .prev
    padding-inline-start: 16px
  .next
    padding-inline-end: 16px
  .disable
    cursor: inherit
    opacity: .3
  .spacer
    flex: 1
  .left, .right
    font-size: 14px
    padding-top: 2px
    opacity: .7
    pointer-events: none
    position: absolute
  .left
    left: 0
  .right
    right: 0
</style>