<template>
  <div></div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({ credentials: 'teemops/credentials' }),
  },
})
</script>