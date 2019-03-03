<template lang="pug">
.Button(@click="$emit('click', $event)" :class="{hover}" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave")
  Icon {{icon}}
  | {{hover ? hoverMessage : ''}}
  slot(v-if="!hoverMessage || !hover")
</template>

<script>
export default {
  name: 'Button',
  props: ['hoverMessage', 'name', 'icon'],
  data () {
    return {
      hover: false
    }
  },
  methods: {
    onMouseEnter () {
      this.hover = true
    },
    onMouseLeave () {
      this.hover = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Button
  display: grid
  padding: 12px 24px
  grid-template-columns: repeat(2, auto)
  grid-column-gap: 8px
  align-items: center
  justify-content: center
  white-space: nowrap
  cursor: pointer
  font-size: 16px
  font-weight: 500
  text-transform: uppercase
  background-color: rgba(127, 127, 127, .4)
  border: 1px solid rgba(255, 255, 255, .1)
  border-radius: 4px
  &:hover
    background-color: rgba(255, 255, 255, 0.2)
  .Icon
    opacity: .75
    font-size: 16px
</style>