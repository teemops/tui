<template>
  <div>
    <signup v-if="signupState == 'start'"></signup>
    <connect-account
      v-if="signupState == 'complete'"
      :subscriptionId="subscriptionId"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Signup from '~/components/Account/Signup.vue'
import ConnectAccount from '~/components/Account/ConnectAccount.vue'

export default Vue.extend({
  components: {
    Signup,
    ConnectAccount,
  },
  async mounted() {},
  data() {
    var params = this.$route.params
    return {
      signupState: params.subid != undefined ? 'complete' : 'start',
      subscriptionId: params.subid != undefined ? params.subid : null,
    }
  },
})
</script>