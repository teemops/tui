<template>
  <div>
    <v-toolbar color="white" flat>
      <v-toolbar-title class="grey--text text--darken-4">
        Servers
      </v-toolbar-title>
    </v-toolbar>

    <v-row v-for="s in servers" v-bind:key="s.name" justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">{{ s.name }}</v-card-title>
          <v-card-text>
            {{ s.status }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary"> View</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  layout: 'dashboard',
  data() {
    var dismiss = parseInt(localStorage.getItem('dismiss') || '0')
    var servers = [
      {
        status: 'running',
        name: 'default',
      },
      {
        status: 'stopped',
        name: 'dev',
      },
    ]
    return {
      dismiss: dismiss,
      servers: servers,
    }
  },
  // methods: {
  //   ...mapActions([''])
  // }
})
</script>
