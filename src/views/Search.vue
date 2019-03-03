<template lang="pug">
#Home
  .container
    h1 
      | Results for
      span {{query}}
    Panel(:dropdowns="dropdowns" v-on:ondropdownClick="ondropdownClick")
      Pagination(:data="trending" cols="6" rows="3" type="Show" hide="true" v-on:loadMore="loadMore" placeholder="true")
</template>

<script>
import tvmate from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      query: this.$route.params.search,
      episodes: [],
      genres:   {},
      trending: [],
      ratings:  {
        options: [
          {name:' 9 and above', slug: '90-100'},
          {name:' 8 and above', slug: '80-90'},
          {name:' 7 and above', slug: '70-80'},
          {name:' 6 and above', slug: '60-70'},
          {name:' 5 and above', slug: '50-60'},
          {name:' below 5', slug: '0-50'},
        ],
        default: 'Any Rating'
      },
      filters: {
        page: 1
      }
    }
  },
  watch: {
    '$route' () {
      this.query = this.$route.params.search
      this.filters.page = 1
      this.trending = []
      this.fetch()
    }
  },
  computed: {
    dropdowns () {
      return {
        left: [this.genres],
        right: [this.ratings]
      }
    }
  },
  methods: {
    ondropdownClick (sec, i, slug) {
      if (sec == 0) {
        switch (i) {
          case 0:
            this.filters.genres = slug
          break
        }
      } else {
        switch (i) {
          case 0:
            this.filters.ratings = slug
          break
        }
      }
      this.filters.page = 1
      this.trending = []
      this.fetch()
    },
    loadMore () {
      this.filters.page++
      this.fetch()
    },
    fetch (n = 1) {
      tvmate.searchFor(this.query, this.filters).then(trending => {
        this.trending = [...this.trending, ...trending]
        if (n > 1) {
          this.filters.page++
          this.fetch(n - 1)
        }
      })
    }
  },
  mounted () {
    this.fetch(2)
    tvmate.getGenres().then(genres => {
      console.log(genres.data)
      this.genres = {
        options: genres.data,
        default: 'All Genres'
      }
    })
  }
}
</script>

<style lang="sass">
#Home
  margin-top: 128px
  h1
    color: #c0c0c0
  span
    color: white
    font-weight: 400
    padding: 0 24px
  .Panel
    margin: 36px 0
</style>