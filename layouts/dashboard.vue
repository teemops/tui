<template>
  <v-app dark>
    <v-navigation-drawer app absolute dark width="300px" permanent>
      <template v-slot:prepend>
        <account-info></account-info>
      </template>
      <v-list>
        <v-list-item v-for="item in navitems" :key="id" link :to="item.id">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <img src="~/assets/TeemLogo1ps-small.png" height="40px" />
      <v-spacer /><a
        target="_blank"
        style="color: #fff; text-decoration: none"
        href="https://forms.gle/Wc59rcKi2RPXfqTw6"
      >
        <v-btn class="secondary">Get Support</v-btn></a
      >
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AccountInfo from '~/components/Account/AccountInfo.vue'
export default Vue.extend({
  name: 'dashboard',
  components: {
    AccountInfo,
  },
  data() {
    return {
      title: 'SCG - Simple Cloud Generator',
      rightDrawer: true,
      right: true,
      navitems: [
        {
          id: 'home',
          icon: 'mdi-home',
          text: 'Launch',
        },
        {
          id: 'accounts',
          icon: 'mdi-domain',
          text: 'Accounts',
        },
      ],
    }
  },
})
</script>
