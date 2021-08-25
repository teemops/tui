<template>
  <v-banner single-line @click:icon="alert">
    <v-icon slot="icon" color="warning" size="36">
      mdi-wifi-strength-alert-outline
    </v-icon>
    <p>Connect your AWS Account for more features.</p>
    <p>
      <b>Email address</b>. This is required to setup your connection and login
      details.
    </p>
    <p>
      The Connection creates a CloudFormation template with restricted IAM
      Account Access. The template can be audited here:
      <a
        target="_blank"
        href="https://github.com/teemops/teemops/blob/work/cloudformation/iam.role.child.account.cfn.yaml"
        >here on Github</a
      >.
    </p>
  </v-banner>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>