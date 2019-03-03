<template lang="pug">
  #app(:dir="$lang.current_lang == 'ar' ? 'rtl' : 'ltr'")
    Navbar
    transition(name="fade")
      router-view.view(:key="$route.fullPath")
    tv-footer
</template>

<script>
export default {
  name: 'App',
  mounted () {
  	this.$lang.setLang(this.$route.params.lang)
  }
}
</script>

<style lang="sass">
@import 'sass/main.sass'
#app
  height: 100%
  .view
    min-height: calc(100% - 54px)
</style>
