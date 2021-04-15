<template>
  <v-app dark>
    <v-app-bar fixed app>
      <img src="~/assets/TeemLogo1ps-small.png" height="40px" />
      
      <v-spacer /><a target="_blank" style="color:#fff;text-decoration:none;" href="https://forms.gle/Wc59rcKi2RPXfqTw6">
      <v-btn class="secondary">GIVE Feedback</v-btn></a>
      <v-spacer/>
      <iframe src="https://ghbtns.com/github-btn.html?user=teemops&repo=tui&type=star&count=true&size=large" 
      frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
      
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      
      padless="true"
    >
    <v-card flat
        tile
        width="100%"
        class="secondary lighten-1 text-center">
    
        <v-card-text class="white--text">
          <strong>Teemops &copy; Copyright</strong> {{ new Date().getFullYear() }}
          &nbsp;
          <a target="_blank" class="secondary" style="text-decoration:none;" href="https://forms.gle/Wc59rcKi2RPXfqTw6">
      <v-btn class="white">GIVE Feedback</v-btn></a>
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
