<template>
  <div>
    <connect-banner v-if="!authenticated" />
    <notify
      :message="message"
      v-if="message.length > 0"
      v-on:close="closeNotify"
    />
    <v-form ref="form" v-model="formValid" v-on:submit.prevent="">
      <v-card v-if="!authenticated">
        <v-card-title class="headline">Connect My AWS Account</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
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
                v-if="showPass || accountExists"
                type="password"
                label="Enter password"
                :rules="passValidation"
                v-model="password"
              ></v-text-field>
              <v-text-field
                v-if="showPass"
                type="password"
                label="Confirm password"
                :rules="cpassValidation"
                v-model="cpassword"
              ></v-text-field>
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

              <v-btn
                v-if="!showPass && accountExists"
                color="primary"
                v-on:click="loginMe"
              >
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="waiting == true"
                ></v-progress-circular>
                Login
              </v-btn>

              <a
                v-on:click="resetForm"
                v-if="showVerify || showPass || accountExists"
                >Try another email</a
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions v-if="!showPass && !accountExists">
          <v-btn
            color="primary"
            v-on:click="connectMyAccount"
            :disabled="waiting == true || email.length == 0"
            ><v-progress-circular
              indeterminate
              color="white"
              v-if="waiting == true"
            ></v-progress-circular
            >Connect My AWS Account
          </v-btn>
          <v-spacer />
          <v-btn color="secondary" v-on:click="cancelFlow">Cancel </v-btn>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
      <features v-if="!authenticated"></features>

      <v-card v-if="authenticated">
        <v-card-title class="headline">My Account </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p>
                Your new account has been created and your account linking will
                complete once your AWS account is connected. To complete linking
                of your AWS account, please complete the launch of the
                CloudFormation template that was opened in a new browser tab.
              </p>
              <p>
                If this tab was not opened then click here:
                <a :href="AWSLinkUrl" target="_blank"
                  >Launch CloudFormation template in AWS Account.</a
                >
              </p>
              <p>
                This opens a new browser window which will take you to your AWS
                Account to complete the process.
              </p>
              <p>
                Once connected you can click the button below. If you have any
                issues please refresh the page or email support@teemops.com
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <a href="/"><v-btn color="primary">Start App</v-btn></a>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ConnectBanner from '~/components/Account/ConnectBanner.vue'
import Features from '~/components/Info/Featues.vue'
import Notify from '~/components/Notify.vue'

const NO_SPACES_REGEX = /^([A-z])*[^\s]\1*$/
const EMAIL_REGEX = /^([A-z\@\.])*[^\s]\1*$/
const NUMBER_REGEX = /^([0-9])*[^\s]\1*$/
const CFN_TEMPLATE =
  'https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?templateUrl=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Ftemplates.teemops.com%2Fiam.role.child.account.cfn.yaml&stackName=teemops-dontdelete&param_ParentAWSAccountId=231648734092'

/**
 * This Component manages the signup completion and connect account process.
 * Steps are as follows:
 * - Get Stripe checkout code
 * - Add email
 */
export default Vue.extend({
  props: {
    subscriptionId: { type: String, required: false } as PropOptions<String>,
  },
  components: {
    ConnectBanner,
    Notify,
    Features,
  },
  async mounted() {
    //check the stripe session if it exists
    console.log('Connect Account mounted')
    if (this.subscriptionId != undefined) {
      //check if the subscription is processed
      try {
        /**
         * Get the stripe checkout information, example looks like this
         *
         */
        var checkout = await this.checkStripeSession(this.subscriptionId)
        if (checkout.result.email != undefined) {
          this.email = checkout.result.email
        }
      } catch (e) {
        throw e
      }
    }
    // const userDetails = await this.getUser()

    // if (userDetails) {
    //   this.authenticated = true
    //   this.message = `Welcome back, you can view your account here.`
    //   if (this.cfnData.uniqueId === undefined) {
    //     const launchCodes = await this.generate()
    //     this.cfnData = launchCodes
    //   }
    // } else {
    //   console.log('Not logged in')
    //   this.authenticated = false
    // }
  },
  methods: {
    ...mapActions({ checkUser: 'auth/check' }),
    ...mapActions({ login: 'auth/login' }),
    ...mapActions({ logout: 'auth/logout' }),
    ...mapActions({ register: 'auth/register' }),
    ...mapActions({ verifyUser: 'auth/verify' }),
    ...mapActions({ generate: 'auth/generate' }),
    ...mapActions({ getUser: 'auth/getUser' }),
    ...mapActions({ checkStripeSession: 'checkStripeSession' }),
    ...mapActions({ saveStripeSessionDetails: 'saveStripeSessionDetails' }),
    loginMe: async function () {
      this.waiting = true
      try {
        const goLogin = await this.login({
          email: this.email,
          password: this.password,
        })
        if (goLogin) {
          const userDetails = await this.getUser()

          if (userDetails) {
            this.authenticated = true
            if (this.cfnData.uniqueId === undefined) {
              const launchCodes = await this.generate()
              this.cfnData = launchCodes
            }
            this.message = `Welcome back, you can view your account here.`
          } else {
            console.log('Not logged in')
            this.authenticated = false
          }
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
    connectMyAccount: async function () {
      this.waiting = true
      try {
        const check = await this.checkUser(this.email)
        if (!check) {
          const register = await this.register(this.email)
          if (register) {
            this.message =
              'A verification code has been sent to your email address, please enter below.'
            this.verify = true
          } else {
            throw 'Error with registration, please try again or refresh page.'
          }
        } else {
          this.verify = false
          this.message =
            'An account already exists for this email, please try another one or sign in.'
          this.accountExists = true
        }
      } catch (e) {
        this.message = `An error occured: ${e}`
      } finally {
        this.waiting = false
      }
    },
    cancelFlow: function () {
      console.log('HEY I want to cancel outa here!')
      this.$emit('cancelMe')
    },
    resetForm: function () {
      this.verify = false
      this.accountExists = false
      this.email = ''
    },
    closeNotify: function () {
      this.message = ''
    },
    completeVerify: async function () {
      console.log('Completeverify')
      if (this.verifyCode != null && this.verifyCode.length == 6) {
        if (
          this.password != null &&
          this.password.length >= 8 &&
          this.password.length <= 20 &&
          this.password == this.cpassword
        ) {
          try {
            const verifyResult = await this.verifyUser({
              email: this.email,
              code: this.verifyCode,
              newPassword: this.password,
            })
            if (verifyResult === true) {
              //now login
              await this.loginMe()
              this.message =
                'You are now logged in and a new browser tab has been launched to connect your AWS account.'
              this.authenticated = true
              //connects to topsless and gets unique code and STS token to pass into cloudformation parameters
              const launchCodes = await this.generate()
              this.cfnData = launchCodes
              const cfnUrl = `${CFN_TEMPLATE}&param_ExternalId=${this.cfnData.externalId}&param_UniqueId=${this.cfnData.uniqueId}`
              window.open(cfnUrl, '_blank')
              const saveStripeSession = await this.saveStripeSessionDetails(
                this.subscriptionId
              )
              if (saveStripeSession) {
                this.message =
                  'Your trial has started and you will be charged in 14 days time.'
              }
            } else {
              this.message = verifyResult
            }
          } catch (e) {
          } finally {
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters({ token: 'auth/token' }),
    showPass(): any {
      return this.verifyCode != null && this.verifyCode.length == 6
    },
    AWSLinkUrl(): string {
      if (this.authenticated && this.cfnData.uniqueId != undefined) {
        const cfnUrl = `${CFN_TEMPLATE}&param_ExternalId=${this.cfnData.externalId}&param_UniqueId=${this.cfnData.uniqueId}`
        return cfnUrl
      } else {
        return ``
      }
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
  data() {
    return {
      cfnData: {} as any,
      authenticated: false,
      completed: false,
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
      stripeCheckoutData: null,
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
})
</script>
