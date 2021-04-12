<template>
  <div>
    <v-form v-if="!generate" v-model="formValid">
      <v-card>
        <v-card-title class="headline"> Launch an AWS Resource </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" sm="4" md="6">
              <v-select
                v-model="cloud.resource"
                :items="resources"
                item-text="description"
                item-value="name"
                label="Select resource to launch"
              >
              </v-select>

              <v-select
                v-model="cloud.os"
                :items="oses"
                item-text="name"
                item-value="id"
                label="Select OS to launch"
                v-on:change="updateDisplay"
              >
              </v-select>
            </v-col>
            <v-col cols="6" sm="4" md="6">
              <v-select
                v-model="cloud.region"
                :items="regions"
                item-text="name"
                item-value="id"
                label="Select region to launch into"
                v-on:change="updateDisplay"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="opt in resourceOptions" cols="6">
              <div>
                <v-checkbox
                  v-if="opt.type === 'boolean'"
                  :label="opt.description"
                  v-model="parameters[opt.name]"
                ></v-checkbox>
                <v-text-field
                  v-if="opt.type === 'string'"
                  :label="opt.description"
                  v-model="parameters[opt.name]"
                ></v-text-field>
                <v-text-field
                  v-if="opt.type === 'integer'"
                  :label="opt.description"
                  :rules="opt.validation"
                  v-model="parameters[opt.name]"
                ></v-text-field>
                <v-combobox
                  v-if="opt.type === 'list'"
                  :label="opt.description"
                  :items="opt.values"
                  :item-text="opt.textPath"
                  :item-value="opt.valuePath"
                  v-model="parameters[opt.name]"
                ></v-combobox>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" v-on:click="generateTemplate">
            Generate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-divider></v-divider>

    <v-card v-if="generate">
      <v-card-title class="headline"> Details </v-card-title>
      <v-card-text>
        <p>
          <a :href="templateUrl" target="_blank">Launch in CloudFormation</a>
        </p>
        <p>
          <v-textarea
            filled
            name="cli"
            label="AWS CLI Command"
            :value="`aws ec2 run-instances --image-id ami-0ae908d55124839d9 --instance-type ${parameters.InstanceType.vm_size}`"
          ></v-textarea>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" v-on:click="generate = false"> Edit </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
const regions = require('~/assets/data/regions.json')
const instanceTypes = require('~/assets/data/instance_types')
export default Vue.extend({
  props: {
    id: { type: String, required: true } as PropOptions<String>,
  },
  async mounted() {
    try {
      const result = await this.$axios.$get(
        'https://api.tcg.app.teemops.com/templates'
      )
      this.oses = result.templates
    } catch (e) {
      console.log('error with request to amis')
    }
  },
  methods: {
    generateTemplate: function () {
      this.generate = true
      if (Object.keys(this.parameters).length > 0) {
        const baseUrl =
          'https://console.aws.amazon.com/cloudformation/home?region='
        const teemopsTemplateUrl =
          'https%3A%2F%2Ftemplates.teemops.com.s3-us-west-2.amazonaws.com%2F'
        let globalParameters = this.parameters
        var paramString: string = ''
        Object.keys(this.parameters).forEach((key) => {
          paramString += `&param_${key}=${globalParameters[key]}`
        })

        this.templateUrl = `${baseUrl}${this.cloud.region}#/stacks/quickcreate?templateUrl=${teemopsTemplateUrl}${this.cloud.resource}.cfn.yaml&stackName=teemops-${this.parameters.AppName}-stack${paramString}`
      } else {
        this.templateUrl = 'https://nourlyet'
      }
    },
    /**
     * Updates hidden fields values
     * e.g AMI is updated
     */
    updateDisplay: async function () {
      try {
        const data = {
          region: this.cloud.region,
          cloud_provider: 1,
          app_provider: this.cloud.os,
        }
        const result = await this.$axios.$post(
          'https://api.tcg.app.teemops.com/amis/view',
          data
        )
        this.parameters.AMI = result.amis.ami
      } catch (e) {
        console.log('error with request to amis')
      }
    },
    showSection: async function (resourceName: any) {
      return this.cloud.resource == resourceName
    },
  },
  computed: {
    resourceOptions(): any {
      let currentResourceName = this.cloud.resource
      var currentOptions = this.options.filter(function (value) {
        return value.resources.indexOf(currentResourceName) > -1
      })

      return currentOptions
    },
    // templateUrl(): any {
    //     if (Object.keys(this.parameters).length > 0) {
    //       const baseUrl =
    //         'https://console.aws.amazon.com/cloudformation/home?region='
    //       const teemopsTemplateUrl =
    //         'https%3A%2F%2Ftemplates.teemops.com.s3-us-west-2.amazonaws.com%2F'
    //       let globalParameters = this.parameters
    //       var paramString: string = ''
    //       Object.keys(this.parameters).forEach((key) => {
    //         paramString += `&param_${key}=${globalParameters[key]}`
    //       })
    //       return `${baseUrl}${this.cloud.region}#/stacks/quickcreate?templateUrl=${teemopsTemplateUrl}${this.cloud.resource}.cfn.yaml&stackName=teemops-${this.parameters.AppName}-stack${paramString}`
    //     } else {
    //       return 'https://nourlyet'
    //     }
    // },
    // parameters(): any {
    //   let currentResourceName = this.cloud.resource
    //   var currentOptions = this.options.filter(function (value) {
    //     return value.resources.indexOf(currentResourceName) > -1
    //   })
    //   var cloudDefaults = currentOptions.map(function (value) {
    //     return { name: value.name, value: '' }
    //   })
    //   this.parameters = [...cloudDefaults]
    // },
  },
  data() {
    return {
      generate: false,
      formValid: false,
      templateUrl: '',
      cloud: {
        resource: 'ec2',
        region: 'us-east-1',
        os: '',
      },
      parameters: {} as any,
      regions: (regions as Array<any>).sort(function (a, b) {
        return a.name - b.name
      }),
      instanceTypes: instanceTypes,
      oses: [
        { name: 'Ubuntu 20.04 LTS', id: 17 },
        { name: 'Ubuntu 18.04 LTS', id: 13 },
        { name: 'Ubuntu 16.04 LTS', id: 8 },
      ],
      resources: [
        {
          name: 'ec2',
          description: 'Launch EC2 Instance',
        },
        {
          name: 'asg',
          description: 'Launch Autoscaling Group',
        },
        {
          name: 'rds',
          description: 'Launch RDS Database',
        },
      ],
      options: [
        {
          name: 'AppName',
          description: 'Resource Name',
          resources: ['ec2', 'asg'],
          type: 'string',
        },
        {
          name: 'KeyPair',
          description: 'Keypair Name',
          resources: ['ec2', 'asg'],
          type: 'string',
        },
        {
          name: 'RootVolumeSize',
          resources: ['ec2', 'asg'],
          description: 'EBS Volume Size',
          type: 'integer',
          validation: [
            (v: any) => !!v || 'This field is required',
            (v: any) => (v && v >= 30) || 'EBS Volume Size between 30-4,000GB',
            (v: any) =>
              (v && v <= 4000) || 'EBS Volume Size between 30-4,000GB',
          ],
        },
        {
          name: 'InstanceType',
          resources: ['ec2', 'asg'],
          description: 'EC2 Instance Type',
          type: 'list',
          values: instanceTypes.map(function (value: any) {
            return value.vm_size
          }),
          textPath: 'vm_size',
          valuePath: 'vm_size',
        },
        {
          name: 'Subnets',
          description: 'Subnets',
          resources: ['ec2', 'asg'],
          type: 'list',
          values: [],
        },
        {
          name: 'SecurityGroup',
          description: 'Security Group',
          resources: ['ec2', 'asg'],
          type: 'string',
        },
        {
          name: 'HasPublicIp',
          resources: ['ec2', 'asg'],
          description: 'Public IP Address?',
          type: 'boolean',
        },
        {
          name: 'HasElasticIp',
          resources: ['ec2', 'asg'],
          description: 'Use a Static(Elastic) IP?',
          type: 'boolean',
        },
        {
          name: 'DatabaseName',
          resources: ['rds'],
          description: 'Database Name',
          type: 'string',
        },
      ] as Array<any>,
    }
  },
})
</script>
