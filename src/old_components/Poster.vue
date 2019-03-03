<template lang="pug">
.Poster(:style="`--ratio:${_ratio};--crop:${_crop}; --img: url(${src})`")
  img(v-on:load="onLoad" :class="loaded ? 'loaded' : ''" :src="src")
  .progress(v-if="progress" :style="'--percentage:' + (progress * 100) + '%'")
</template>

<script>
export default {
  name: 'Poster',
  props: ['progress', 'ratio', 'crop', 'src', 'id'],
  data () {
    return {
     loaded: false,
     error: false
    }
  },
  computed: {
    _ratio () {
     return this.ratio && (this.ratio.split(':')[1] / this.ratio.split(':')[0]) || 1
    },
    _crop () {
     return this.crop && (this.crop.split(':')[1] / this.crop.split(':')[0]) || this._ratio
    },
  },
  methods: {
    onLoad () {
      this.loaded = true
    },
    onClick () {
      this.$router.push('/show/' + this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Poster
  --ratio: 1
  --crop: var(--ratio)
  width: 100%
  padding-top: calc(100% * var(--crop))
  position: relative
  background-image: linear-gradient(rgba(73, 73, 75, .7), #353537)
  border-radius: 2px
  --inset: inset 0 0 1px  rgba(255, 255, 255, .5)
  --outset: 0 2px 8px rgba(0, 0, 0, .5)
  box-shadow: var(--outset), var(--inset) 
  cursor: pointer
  background-size: cover
  overflow: hidden
  background-position: center
  will-change: transform
  user-select: none
  img
    top: calc(50% * (1 - var(--ratio) / var(--crop)))
    position: absolute
    opacity: 0
    height: calc(100% * var(--ratio) / var(--crop))
    width: 100%
    transition: opacity .2s ease-in-out
    z-index: 1
    pointer-events: none
    &.loaded
      opacity: 1
  .progress
    width: 100%
    max-width: 100%
    height: 4px
    background-color: #D32F2F
    z-index: 1
    bottom: 0
    left: 0
    position: absolute
    overflow: hidden
    --percentage: 10%
    padding-inline-start: var(--percentage)
    &::after
      content: ''
      width: 100%
      height: 4px
      display: block
      background-color: #691717
</style>