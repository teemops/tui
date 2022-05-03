<template>
  <div>
    <v-banner> <h3>Manage your Account</h3></v-banner>

    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="headline">My Profile</v-card-title>
              <v-card-text>
                Welcome to your profile. You can connect update your profile
                details here.</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="headline">AWS Accounts</v-card-title>
              <v-card-text> Connect AWS Accounts here</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="headline">Support</v-card-title>
          <v-card-text>
            <p>Get additional support and help.</p>
            <p></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Notify from '~/components/Notify.vue'

export default Vue.extend({
  components: {
    Notify,
  },
  methods: {},
  data() {
    return {}
  },
})
</script>