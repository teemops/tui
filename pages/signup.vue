<template>
    <div>
    <v-row justify="center" align="center">
      <v-col cols="auto"> </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <h1>testing</h1>
        {{subscriptionId}}
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    async mounted(){
        //check if the subscription is processed
        
    },
    data(){
        var params=this.$route.params;
        return {
            subscriptionId: params.subid
        }
    }
})
</script>