<template>
  <v-container>
    <v-layout>
      <v-breadcrumbs :items="[{ text: 'Álbuns', disabled: true }]" large divider="/" />
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <h1>Albuns</h1>
          </v-card-title>
          <v-fade-transition>
            <v-list v-if="!loading">
              <v-list-tile v-for="item in albums" :key="item.id" :to="`/album/${item.id}`">
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-layout row wrap v-if="loading" justify-center>
              <v-progress-circular
                :size="70"
                :width="7"
                color="red"
                indeterminate
              />
            </v-layout>
          </v-fade-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AlbumsList',
  props: {
    albums: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
