<template>
  <div>
    <v-card>
      <v-card-title class="headline"> Launch something </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4" md="6">
            <v-select
              v-model="cloud.resource"
              :items="resources"
              item-text="description"
              item-value="name"
              label="Select resource to launch"
            >
            </v-select>
            <v-select
              v-model="cloud.region"
              :items="regions"
              item-text="name"
              item-value="id"
              label="Select region to launch into"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="6">
            <div v-for="opt in resourceOptions">
              option: {{ opt.type }} {{ opt.name }}
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
        <v-btn color="primary" v-on:click="dismiss = true"> Generate </v-btn>
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
  methods: {
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
      cloud: {
        resource: 'ec2',
        region: 'us-east-1',
      },
      parameters: {} as any,
      regions: (regions as Array<any>).sort(function (a, b) {
        return a.name - b.name
      }),
      instanceTypes: instanceTypes,
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
          allowedValues: [30, 4000],
        },
        {
          name: 'InstanceType',
          resources: ['ec2', 'asg'],
          description: 'EC2 Instance Type',
          type: 'list',
          values: instanceTypes,
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
