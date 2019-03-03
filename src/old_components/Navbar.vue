<template lang="pug">
.Navbar(:class="{collapsed}")
  .container
    router-link.brand(:to="'/'")
      strong TV
      | Shows
    .list
      .item
        Icon explore
        | {{$lang.main.discover}}
      .item
        Icon calendar_today
        | {{$lang.main.calendar}}
      .item.search
        input(
          id="search"
          type="text"
          :placeholder="$lang.main.search"
          v-model="search"
          v-on:keydown="e => {e.keyCode != 13 || onClick()}")
        Icon.search(@click="onClick") search
        label(for="search").item
          Icon search
          | {{$lang.main.search}}
    .list
      a.item(:href="$lang.current_lang == 'ar' ? '/en' : '/ar'") {{$lang.current_lang == 'ar' ? ' english' : 'عربي'}}
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      scrollTop: 0,
      search: ''
    }
  },
  computed: {
    collapsed () {
      console.log()
      return this.scrollTop > 64
    }
  },
  methods: {
    onClick () {
      if (this.search)
        this.$router.history.push(`/search/${this.search}`)
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollTop = scrollY
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Navbar
  height: 48px
  width: 100%
  position: fixed
  z-index: 100
  top: 0
  background-color: #101010 
  box-shadow: 0 1px 2px rgba(0, 0, 0, .5) 
  user-select: none
  .container
    font-size: 12px 
    display: flex
    height: 100%
    .brand
      display: flex
      align-items: center
      padding: 0 12px
      font-size: 20px
      text-shadow: 0 3px 6px rgba(23, 23, 23, .5)
      color: #fff
      direction: ltr
    .list
      display: flex
      text-shadow: 0 2px 4px rgba(23, 23, 23, 1)
      &:first-of-type
        flex: 1
      .item
        color: #fff
        display: flex
        align-items: center
        text-align: center
        padding: 0 12px
        margin: 0
        opacity: .7
        transition: color .2s ease-in-out
        cursor: pointer
        &:hover
          opacity: 1
        &.selected
          font-weight: 500
          color: #fff
        .Icon
          line-height: inherit
          padding: 0 4px
          opacity: .7
        &.search
          opacity: 1
          cursor: pointer
          input
            margin: 0
            height: 24px
            border: 0
            padding: 0
            width: 0
            transition: padding .3s, width .3s
            transition-delay: .2s
            color: #fff
            &:focus
              width: 192px
              padding-inline-start: 12px
              transition-delay: 0s
            &:hover ~ .item
              opacity: 1
            &:focus ~ .item
              transition-delay: 0s
              opacity: 0
            &:focus ~ .Icon
              transition-delay: 0s
              width: 12px
          .item
            font-size: 12px 
            font-weight: 300
            padding: 0
            transition: opacity .3s
            transition-delay: .2s
          .search
            padding: 0
            width: 0
            overflow: hidden
            font-size: 12px
            cursor: pointer
            transition: width 0s
            transition-delay: .2s 
            &:hover
              opacity: 1
</style>