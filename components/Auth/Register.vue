<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="Enter email address"
          :rules="emailValidation"
          v-model="email"
        ></v-text-field>

        <v-text-field
          v-if="showPass"
          type="password"
          label="Enter password"
          :rules="passValidation"
          v-model="password"
        ></v-text-field>
        <v-btn
          v-if="showPass"
          color="primary"
          v-on:click="loginMe"
          :disabled="email.length == 0 && password.length == 0"
        >
          Register
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ConnectBanner from '~/components/Account/ConnectBanner.vue'
import Notify from '~/components/Notify.vue'

const NO_SPACES_REGEX = /^([A-z])*[^\s]\1*$/
const EMAIL_REGEX = /^([A-z\@\.])*[^\s]\1*$/

export default Vue.extend({
  components: {
    ConnectBanner,
    Notify,
  },
  methods: {
    ...mapActions({ checkUser: 'auth/check' }),
    ...mapActions({ login: 'auth/login' }),
    registerMe: async function () {
      const goLogin = await this.login({
        email: this.email,
        password: this.password,
      })
      if (goLogin) {
        this.message = `Logged in token ${this.token}`
      } else {
        this.message =
          'Login was unsuccessful, please try again or reset password.'
      }
    },
    connectMyAccount: async function () {
      const check = await this.checkUser(this.email)
      if (!check) {
        this.waiting = true

        window.open(
          'https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?templateUrl=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Ftemplates.teemops.com%2Fiam.role.child.account.cfn.yaml&stackName=teemops-dontdelete&param_ParentAWSAccountId=231648734092',
          '_blank'
        )
      } else {
        this.message =
          'An account already exists for this email, please try another one or sign in.'
        this.accountExists = true
      }
    },
    cancelFlow: function () {
      console.log('HEY I want to cancel outa here!')
      this.$emit('cancelMe')
    },
  },
  computed: {
    ...mapGetters({ token: 'auth/token' }),
    showPass(): any {
      return this.accountExists
    },
  },
  data() {
    return {
      message: '',
      waiting: false,
      test: false,
      formValid: true,
      accountExists: false,
      email: '',
      password: '',
      emailValidation: [
        (v: any) => !!v || 'This field is required',
        (v: any) => EMAIL_REGEX.test(v) || 'Must be a valid email address',
      ],
      passValidation: [
        (v: any) => !!v || 'This field is required',
        (v: any) =>
          !NO_SPACES_REGEX.test(v) || 'No spaces are allowed in password',
        (v: any) =>
          (v.length >= 8 && v.length <= 50) ||
          'Password must be from 8-50 characters',
      ],
    }
  },
})
</script>
