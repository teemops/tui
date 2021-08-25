<template>
  <div>
    <v-card width="400">
      <v-img height="200px" src="/images/sidebar-background.png">
        <v-card-title class="white--text mt-8">
          <v-avatar size="56">
            <img
              alt="user"
              src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
            />
          </v-avatar>
          <p class="ml-3">Ben Fellows</p>
        </v-card-title>
      </v-img>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapActions({ userDetails: 'auth/userDetails' }),
  },
})
</script>