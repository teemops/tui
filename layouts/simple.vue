<template>
  <v-app dark>
    <v-app-bar fixed app>
      <img src="~/assets/TeemLogo1ps-small.png" height="40px" />

      <v-spacer />
      <b>Teem Ops - Simple Cloud Generator</b>
      <v-spacer />
      <nuxt-link to="login"> <v-btn class="info">Login</v-btn></nuxt-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer padless="true">
      <v-card flat tile width="100%" class="secondary lighten-1 text-center">
        <v-card-text class="white--text">
          <strong>Teemops &copy; Copyright</strong>
          {{ new Date().getFullYear() }}
          &nbsp;
          <a
            target="_blank"
            class="secondary"
            style="text-decoration: none"
            href="https://forms.gle/Wc59rcKi2RPXfqTw6"
          >
            <v-btn class="white">Feedback</v-btn></a
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      title: 'SCG - Simple Cloud Generator',
    }
  },
})
</script>
