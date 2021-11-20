<template>
  <div>
    <connect-banner></connect-banner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ConnectBanner from '~/components/Account/ConnectBanner.vue'

export default Vue.extend({
  components: {
    ConnectBanner,
  },
  data() {
    return {
      test: true,
    }
  },
})
</script>