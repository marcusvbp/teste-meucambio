<template>
  <v-container class="album-viewer">
    <v-layout>
      <v-breadcrumbs :items="[{ text: 'Álbuns', href: '/' }, { text: 'Fotos', disabled: true }]" large divider="/" />
    </v-layout>
    <image-grid :images="images" :loading="loadingData" />
  </v-container>
</template>

<script>
import ImageGrid from '@/components/ImageGrid'
const { error } = console

export default {
  name: 'AlbumViewer',
  components: {
    ImageGrid
  },
  data () {
    return {
      loadingData: false,
      request: {}
    }
  },
  computed: {
    images () {
      return this.request.data || []
    }
  },
  async created () {
    try {
      this.loadingData = true
      const { albumId } = this.$route.params
      this.request = await this.$axios({ method: 'GET', url: `/photos?albumId=${albumId}` })
      this.loadingData = false
    } catch (error) {
      this.loadingData = false
      error(error)
    }
  }
}
</script>
