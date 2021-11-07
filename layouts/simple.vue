<template>
  <v-app dark>
    <v-app-bar fixed app>
      <img src="~/assets/TeemLogo1ps-small.png" height="40px" />

      <v-spacer />
      <b>Teem Ops - Simple Cloud Generator</b>
      <v-spacer />
      <account-menu :status="status"></account-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :padless="true">
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import AccountMenu  from '../components/Account/AccountMenu.vue';

export default Vue.extend({
  components:{
    AccountMenu
  },
  computed: {
    ...mapGetters({ token: 'auth/token' }),
    ...mapGetters({ beenHere: 'auth/beenHere' }),
  },
  /**
   * When vue is mounted we need to check login state
   */
  async mounted() {
    console.log("This is simple.vue mounted")
    try {
      //check if user has loggedin and been here (e.g. in this browser before)
      if (this.beenHere) {
        //first check if we can access account details

        const check = await this.getUser()
        this.status=check
      }
    } catch (e) {
      this.status = false
    }
  },
  methods: {
    ...mapActions({ getUser: 'auth/getUser' }),
  },
  data() {
    return {
      title: 'SCG - Simple Cloud Generator',
      status: null,
    }
  },
})
</script>
