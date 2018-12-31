<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-fade-transition>
            <v-layout row wrap v-if="!loading">
              <v-flex
                  v-for="image in images"
                  :key="image.id"
                  xs4
                  md3
                  d-flex
                >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="image.thumbnailUrl"
                    aspect-ratio="1"
                    class="grey lighten-2 image grid-item"
                    :alt="image.title"
                    @click="show(image)"
                    v-if="image.id"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="loading" justify-center>
              <v-progress-circular
                :size="70"
                :width="7"
                color="red"
                indeterminate
              />
            </v-layout>
          </v-fade-transition>
        </v-container>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="showModal" 
      max-width="600px"
      transition="dialog-transition"
      @input="imageToShow = {}"
    >
      <v-card flat class="d-flex">
        <v-img
          :src="imageToShow.url"
          :lazy-src="imageToShow.thumbnailUrl"
          aspect-ratio="1"
        >
          <v-layout pa-4 column fill-height class="image-legend white--text">
            <v-flex shrink>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-btn flat icon dark @click="showModal = false; imageToShow = {}">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex shrink>
              <div class="title">{{ imageToShow.title }}</div>
            </v-flex>
          </v-layout>

          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'ImageGrid',
  props: {
    testCB: {
      type: Function,
      default: () => () => null
    },
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showModal: false,
      imageToShow: {}
    }
  },
  methods: {
    show (image) {
      this.imageToShow = { ...image }
      this.showModal = true
      this.testCB(image)
    }
  }
}
</script>

<style>
  .image {
    cursor: pointer
  }
  .image-legend {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>
