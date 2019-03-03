<template lang="pug">
.Profile
  Poster.poster(ratio="2:3" crop="3:4" :src="profile")
  .details
    .name {{name}}
    .character {{character}}
</template>

<script>
export default {
  name: 'Profile',
  props: ['id', 'profile', 'name', 'character']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Profile
  position: relative
  padding-bottom: 38px
  .details
    width: 100%
    position: absolute
    bottom: 0
    display: flex
    flex-direction: column
    .name
      font-size: 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .character
      font-size: 10px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      opacity: .7
</style>