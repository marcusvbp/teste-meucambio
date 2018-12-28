<template>
  <v-container fluid class="home">
    <albums-list :albums="albums" :loading="loadingData" />
  </v-container>
</template>

<script>
import AlbumsList from '@/components/AlbumsList.vue'

const { error } = console

export default {
  name: 'home',
  data () {
    return {
      loadingData: false,
      request: {}
    }
  },
  components: {
    AlbumsList
  },
  computed: {
    albums () {
      return this.request.data || []
    }
  },
  async created () {
    try {
      this.loadingData = true
      this.request = await this.$axios({ method: 'GET', url: '/albums' })
      this.loadingData = false
    } catch (error) {
      this.loadingData = false
      error(error)
    }
  }
}
</script>
