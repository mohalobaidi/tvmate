<template lang="pug">
.Footer {{$lang.main.footer}}
</template>

<script>
export default {
  name: 'tv-footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Footer
  width: 100%
  height: 54px
  font-size: 12px
  color: rgba(255, 255, 255, .3)
  display: flex
  align-items: center
  justify-content: center 
  border-top: 1px solid rgba(255, 255, 255, .1)
  clear: both
  position: relative
</style>