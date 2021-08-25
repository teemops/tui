<template>
  <div>
    <v-toolbar color="white" flat>
      <v-toolbar-title class="grey--text text--darken-4">
        Accounts
      </v-toolbar-title>
    </v-toolbar>

    <v-row v-for="a in dummy" justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">{{ a.name }}</v-card-title>
          <v-card-text>
            {{ a.account }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary"> Check</v-btn>
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
    var dummy = [
      {
        account: '1234567891012',
        name: 'default',
      },
      {
        account: '827201837394',
        name: 'dev',
      },
    ]
    return {
      dismiss: dismiss,
      dummy: dummy,
    }
  },
  // methods: {
  //   ...mapActions([''])
  // }
})
</script>
