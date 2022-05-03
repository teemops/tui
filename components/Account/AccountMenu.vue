<template>
  <div>
    <div v-if="status">
      <v-menu open-on-click right top offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            right
            v-bind="attrs"
            v-on="on"
            v-if="!menuState"
            class="ma-2"
            outlined
            text-color="white"
            ><a>
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              My Account
            </a>
          </v-chip>
        </template>

        <v-card absolute right>
          <v-chip
            v-bind="attrs"
            v-on="on"
            v-if="!menuState"
            class="ma-2"
            outlined
            text-color="white"
            ><a>
              <v-avatar left>
                <v-icon>mdi-close</v-icon>
              </v-avatar>
              Close
            </a>
          </v-chip>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="~/assets/images/emptyprofile.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.username }}</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list>
            <v-list-item>
              <nuxt-link to="/dashboard"
                ><v-list-item-title>Dashboard</v-list-item-title></nuxt-link
              >
            </v-list-item>
            <v-list-item @click="account()">
              <nuxt-link to="/user"
                ><v-list-item-title>View Account</v-list-item-title></nuxt-link
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logoutUser()">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <div v-else>
      <nuxt-link to="login"
        ><v-btn class="info"
          ><v-progress-circular
            indeterminate
            color="white"
            v-if="status == null"
          ></v-progress-circular
          >Login</v-btn
        ></nuxt-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  props: {
    status: { type: Boolean, required: false } as PropOptions<Boolean>,
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
    showMenu: function () {
      this.menuState = !this.menuState
    },
    logoutUser() {
      this.logout()
      this.$emit('logout')
    },
  },
  data() {
    return {
      thing: null,
      menuState: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
})
</script>
