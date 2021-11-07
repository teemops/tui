<template>
  <div>
    <notify
      :message="message"
      v-if="message.length > 0"
      v-on:close="closeNotify"
    />
    <v-form ref="form" v-model="formValid" v-on:submit.prevent="">
      <v-card v-if="!dismiss">
        <v-card-title class="headline"> Login </v-card-title>
        <v-card-text>
          <p>You are currently logged out please login below</p>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Enter email address"
                type="email"
                :rules="emailValidation"
                v-model="email"
                :disabled="showVerify || showPass"
              ></v-text-field>
              <v-text-field
                v-if="showVerify"
                label="Enter code"
                :rules="verifyValidation"
                v-model="verifyCode"
              ></v-text-field>
              <v-text-field
                type="password"
                label="Enter password"
                :rules="passValidation"
                v-model="password"
              ></v-text-field>
              <v-text-field
                v-if="showPass"
                type="password"
                label="Enter password"
                :rules="cpassValidation"
                v-model="cpassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <a v-on:click="clearUser">Cancel</a>
          <v-spacer />
          <v-btn
            v-if="showPass && !accountExists"
            color="primary"
            v-on:click="completeVerify"
            :disabled="!showRegister"
          >
            <v-progress-circular
              indeterminate
              color="white"
              v-if="waiting == true"
            ></v-progress-circular>
            Complete Registration
          </v-btn>

          <v-btn color="primary" v-on:click="loginMe">
            <v-progress-circular
              indeterminate
              color="white"
              v-if="waiting == true"
            ></v-progress-circular>
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Notify from '~/components/Notify.vue'

const NO_SPACES_REGEX = /^([A-z])*[^\s]\1*$/
const EMAIL_REGEX = /^([A-z\@\.])*[^\s]\1*$/
const NUMBER_REGEX = /^([0-9])*[^\s]\1*$/

export default Vue.extend({
  components: {
    Notify,
  },
  data() {
    return {
      authenticated: false,
      message: '',
      waiting: false,
      test: false,
      formValid: true,
      accountExists: false,
      email: '',
      password: '',
      cpassword: '',
      verify: false,
      verifyCode: null,
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
      cpassValidation: [
        (v: any, password: any = this.password) =>
          v === password || 'Confirmation Password needs to match',
      ],
      verifyValidation: [
        (v: any) => !!v || 'Must be a valid 6 digit code',
        (v: any) =>
          (NUMBER_REGEX.test(v) && v.length == 6) ||
          'Must be a valid 6 digit code',
      ],
    }
  },
  methods: {
    ...mapActions({ checkUser: 'auth/check' }),
    ...mapActions({ login: 'auth/login' }),
    ...mapActions({ logout: 'auth/logout' }),
    ...mapActions({ register: 'auth/register' }),
    ...mapActions({ verifyUser: 'auth/verify' }),
    ...mapActions({ generate: 'auth/generate' }),
    ...mapActions({ getUser: 'auth/getUser' }),
    ...mapActions({ clearUser: 'auth/clear' }),
    loginMe: async function () {
      this.waiting = true
      try {
        const goLogin = await this.login({
          email: this.email,
          password: this.password,
        })
        if (goLogin) {
          this.$router.push('/')
        } else {
          this.message =
            'Login was unsuccessful, please try again or reset password.'
        }
      } catch (e) {
        this.message =
          'Error contacting auth service, please refresh page or check network connection'
      } finally {
        this.waiting = false
      }
    },
    resetForm: function () {
      this.verify = false
      this.accountExists = false
      this.email = ''
    },
    closeNotify: function () {
      this.message = ''
    },
  },
  computed: {
    ...mapGetters({ token: 'auth/token' }),
    showPass(): any {
      return this.verifyCode != null && this.verifyCode.length == 6
    },

    showRegister(): any {
      if (
        this.password != null &&
        this.password.length >= 8 &&
        this.password.length <= 20 &&
        this.password === this.cpassword
      ) {
        return true
      } else {
        return false
      }
    },
    showVerify(): any {
      return this.verify
    },
  },
})
</script>