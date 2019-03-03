<template lang="pug">
.Layout(:style="`--src: url(${background})`")
  .container
    slot(name="side")
    slot(name="main")
</template>

<script>
export default {
  name: 'Layout',
  props: ['background']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Layout
  padding-top: 210px
  &::after
    content: ''
    position: absolute
    display: block
    width: 100%
    height: 100%
    top: 0
    left: 0
    z-index: -1 
    background-image: linear-gradient(180deg,rgba(0, 0, 0, .5) 0, #171717), var(--src)
    background-size: cover
    background-position: center
  .container
    display: grid
    grid-template-columns: 1fr 3fr
    grid-column-gap: 24px
    //padding-top: 282px
    padding-top: 72px
    & > div, & > aside, & > main
      padding: 12px
</style>