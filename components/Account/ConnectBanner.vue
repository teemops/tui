<template>
  <div>
    <v-banner color="primary"> <h3>Payment Completed</h3></v-banner>
    <v-banner single-line @click:icon="alert">
      <v-icon slot="icon" color="warning" size="36">
        mdi-wifi-strength-alert-outline
      </v-icon>
      <p>
        Now you can create an account with your email address. Once registered
        you will create a connection to your AWS account.
      </p>
      <p>
        The Connection creates a CloudFormation template with restricted IAM
        Account Access. The template can be audited here:
        <a
          target="_blank"
          href="https://github.com/teemops/teemops/blob/work/cloudformation/iam.role.child.account.cfn.yaml"
          >here on Github</a
        >
      </p>
    </v-banner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>