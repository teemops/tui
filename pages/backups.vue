<template>
  <div>
    <v-toolbar color="white" flat>
      <v-toolbar-title class="grey--text text--darken-4">
        Backups
      </v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-card tile>
          <v-list dense>
            <v-card-title>Create a New Backup</v-card-title>
            <v-subheader>Select a Backup Type</v-subheader>
            <!-- <v-radio-group> -->
            <v-list-item-group v-model="type">
              <template v-for="(item, i) in types">
                <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                <v-list-item
                  v-else
                  :key="i"
                  :value="item.name"
                  :input-value="active"
                  active-class="deep-orange--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-icon>{{
                        active
                          ? `mdi-check-circle`
                          : `mdi-checkbox-blank-circle`
                      }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.label"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.desc"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
            <!-- </v-radio-group> -->
          </v-list>
          <v-divider></v-divider>
          <v-list dense>
            <v-subheader>Schedule</v-subheader>
            <!-- <v-radio-group> -->
            <v-list-item-group v-model="currentSchedule.type">
              <template v-for="(item, i) in scheduleTypes">
                <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                <v-list-item
                  v-else
                  :key="i"
                  :value="item.name"
                  :input-value="active"
                  active-class="deep-orange--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-icon>{{
                        active
                          ? `mdi-check-circle`
                          : `mdi-checkbox-blank-circle`
                      }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.label"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
            <!-- </v-radio-group> -->
          </v-list>
          <v-select
            multiple
            v-if="currentSchedule.type == 'weekly'"
            :items="weekDays"
            filled
            label="Select day of week"
          ></v-select>
          <v-menu
            label="Select Time"
            ref="menu"
            v-model="timeMenuShow"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="currentSchedule.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Select Time"
                v-model="currentSchedule.time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeMenuShow"
              v-model="currentSchedule.time"
              full-width
              @click:minute="$refs.menu.save(currentSchedule.time)"
            ></v-time-picker>
          </v-menu>
        </v-card>
      </v-col>
      <v-col
        ><v-spacer></v-spacer>
        <v-card tile>
          <v-subheader>Select Retention</v-subheader>
          <v-card-text>
            <p>
              This will determine how long or how many copies you want to keep.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row justify="center" align="top">
      <v-col cols="12" sm="3" md="4" v-for="t in types" v-bind:key="t.name">
        <v-card>
          <v-card-title class="headline">{{ t.name }}</v-card-title>
          <v-card-text>
            {{ t.desc }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary"> Configure</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  layout: 'dashboard',
  data() {
    var dismiss = parseInt(localStorage.getItem('dismiss') || '0')
    var types = [
      {
        label: 'AWS Backup',
        name: 'aws-backup',
        desc: 'AWS Backup service is an AWS native service',
      },
      {
        label: 'S3 Backup',
        name: 's3-backup',
        desc: 'S3 Backups are configured by a lifecycle rule',
      },
      {
        label: 'Data Lifecycle (EBS & AMIs)',
        name: 'dlm-backup',
        desc: 'Amazon DLM is a service that manages EBS Snapshots',
      },
      {
        label: '3rd Party Backup',
        name: 'third-backup',
        desc: 'You can configure a 3rd party backup product such as Veam',
      },
    ]
    var scheduleTypes = [
      {
        label: 'Daily',
        name: 'daily',
      },
      {
        label: 'Weekly',
        name: 'weekly',
      },
      {
        label: 'Monthly',
        name: 'monthly',
      },
    ]
    return {
      weekDays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dismiss: dismiss,
      timeMenuShow: false,
      types: types,
      scheduleTypes: scheduleTypes,
      type: 'dlm-backup',
      schedule: null,
      currentSchedule: {
        name: '',
        type: 'daily',
        time: null,
      },
    }
  },
  // methods: {
  //   ...mapActions([''])
  // }
})
</script>
