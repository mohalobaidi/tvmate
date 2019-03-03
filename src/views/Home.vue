<template lang="pug">
#Home
  .container(style="padding: 0 36px")
    Hero(:cards="header")
    //- Pane(:title="$lang.main.my_library" icon="bookmark")
    //-   Grid(cols="6" rows="1")
    //-     Show(v-for="show in library" v-bind="show" :key="show.id")
    Panel(:dropdowns="dropdowns" v-on:ondropdownClick="ondropdownClick")
      Pagination(:data="trending" cols="6" rows="3" type="Show" hide="true" v-on:loadMore="loadMore" placeholder="true")
</template>

<script>
import tvmate from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      header:   [],
      episodes: [],
      genres:   {},
      trending: [],
      library:  [],
      ratings:  {
        options: [
          {name:' 10 out of 10', slug: '90-100'},
          {name:' 9 out of 10', slug: '80-90'},
          {name:' 8 out of 10', slug: '70-80'},
          {name:' 7 out of 10', slug: '60-70'},
          {name:' 6 out of 10', slug: '50-60'},
        ],
        default: 'Any Rating'
      },
      filters: {
        page: 1
      }
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
      tvmate.getTrending(this.filters).then(trending => {
        trending = trending.map(show => ({id: show.id}))
        this.trending = [...this.trending, ...trending]
        if (n > 1) {
          this.filters.page++
          this.fetch(n - 1)
        }
        if(this.header.length == 0)
          this.header = [trending[0], trending[1]]
      })
    }
  },
  mounted () {
    this.fetch(2)
    const library = JSON.parse(localStorage.getItem('library')) || []
    tvmate.getShows(library).then(res => {
      this.library = res
    })
    tvmate.getTodaysEpisodes().then(episodes => {
      this.episodes = episodes
    })
    tvmate.getGenres().then(genres => {

      this.genres = {
        options: genres.data.map(genre => ({
          name: this.$lang.main[genre.slug], 
          slug: genre.slug
        })),
        default: this.$lang.main.all_genres
      }
    })
  }
}
</script>