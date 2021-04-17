<template>
<div>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-card v-if="!dismiss">
        <v-card-title class="headline"> Welcome to the SCG </v-card-title>
        <v-card-text>
          <p>
            With the Simple Cloud Generator you can generate a
            CloudFormation template, cli command and CDK code that can then be deployed into your AWS
            account.
          </p>
          <p><b>Follow the steps below to complete:</b>
            <ol>
              <li>Select a resource you want to launch</li>
              <li>Choose the region</li>
              <li>Enter any required fields or optional ones</li>
              <li>Launch into your AWS Account by clicking on the link or copying the cli command into your terminal*</li>
              <li>Download the source code for the template (optional)</li>
            </ol>
          </p>
          <p>
            You'll need to create a subnet, security group and EC2 key pair before launching.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" v-on:click="dismissLocal"> Dismiss </v-btn>
        </v-card-actions>
      </v-card>
  
    </v-col>
  </v-row>
  <v-row justify="center" align="center">
    <v-col cols="auto">
        <generator id="test"></generator>
    </v-col>
  </v-row>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Generator from '~/components/Generator.vue'

export default Vue.extend({
  layout: 'simple',
  components: {
    Generator
  },
  methods: {
    /**
     * persist dismiss value
     */
    dismissLocal: async function(){
      this.dismiss=1
      localStorage.setItem('dismiss', '1');
    }
  },
  data(){
    var dismiss=parseInt(localStorage.getItem('dismiss') || '0')
    return {
      dismiss: dismiss
    }
  },
  // methods: {
  //   ...mapActions([''])
  // }
})
</script>
