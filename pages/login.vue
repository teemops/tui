<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="auto"> </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <login></login>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Login from '~/components/Auth/Login.vue'

export default Vue.extend({
  name: 'public',
  layout: 'simple',
  components: {
    Login,
  },
})
</script>