<template lang="pug">
#Episode
  .container
    .wrapper
      iframe(v-if="src" :src="src" scrolling="no" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true")
    .details
      Poster(ratio="2:3" :src="poster")
      .info
        .title {{title}}
        .number Season {{s}} - Episode {{e}}
    .actions
      Icon.left chevron_left
      .prev prev
      Icon.middle list
      .next next
      Icon.right chevron_right
</template>

<script>
import tvmate from '@/api'

export default {
  name: 'Episode',
  data () {
    return {
      id: this.$route.params.id,
      s:  this.$route.params.season,
      e:  this.$route.params.episode,
      title: '',
      poster: '',
      src: '',
    }
  },
  mounted () {
    tvmate.getShowDetails(this.id).then(res => {
      this.title = res.title,
      this.poster = res.poster
    })
  }
}
</script>

<style lang="sass" src="./style.sass" scoped />