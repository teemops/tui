<template>
  <div>
    <view-account></view-account>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ViewAccount from '~/components/Account/ViewAccount.vue'

export default Vue.extend({
  components: { ViewAccount },
})
</script>