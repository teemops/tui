<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-banner color="primary">
          <h3>Signup for a Free 14 Day Trial</h3>
        </v-banner>
        <v-banner single-line @click:icon="alert">
          <v-icon slot="icon" color="warning" size="36">
            mdi-wifi-strength-alert-outline
          </v-icon>

          <p>Connect your AWS Account to get access to more features</p>
          <p>
            Select Dropdown lists from your account including VPC, Subnets,
            Keypairs and more
          </p>
          <p>Make cloud operations more simple.</p>
        </v-banner>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title class="headline">Pay via Stripe</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6"><b>Product</b> </v-col>
              <v-col cols="2"><b>Period</b> </v-col>
              <v-col cols="4" justify="right"><b>Amount</b></v-col>
            </v-row>
            <v-row>
              <v-col cols="6"
                >Teemops Simple Cloud Generator (Subscription charged after 14
                days)
              </v-col>
              <v-col cols="2">1 month </v-col>
              <v-col cols="4" justify="right"> $19.95 </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" v-on:click="checkout"
              ><v-progress-circular
                indeterminate
                color="white"
                v-if="waiting == true"
              ></v-progress-circular
              >Checkout
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <img src="~/assets/images/stripe-paid.svg" width="200"
          /></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ConnectBanner from '~/components/Account/ConnectBanner.vue'
import Features from '~/components/Info/Featues.vue'

export default Vue.extend({
  components: {
    ConnectBanner,
    Features,
  },
  methods: {
    checkout: async function () {
      window.location.href = this.paymentLink
    },
  },
  data() {
    return {
      paymentLink: process.env.stripe_link,
    }
  },
})
</script>