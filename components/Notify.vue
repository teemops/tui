<template>
  <div class="text-center ma-2">
    <v-alert border="bottom" color="blue lighten-1" dark>
      <span color="#000;">{{ message }}</span>
      <v-btn color="black" text @click="closeMe"> Close </v-btn>
    </v-alert>
  </div>
</template>
 
 <script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    message: { type: String, required: true } as PropOptions<String>,
  },
  methods: {
    closeMe: function () {
      this.$emit('close')
    },
  },
  data() {
    return {
      snackbar: true,
    }
  },
})
</script>
 
 <style>
</style>