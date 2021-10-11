<template>
  <div>
    <v-row>
      <v-col v-for="opt in formFields" cols="6">
        <div>
          <v-checkbox
            v-if="opt.type === 'boolean'"
            :label="opt.description"
            v-model="parameters[opt.name]"
          ></v-checkbox>
          <v-text-field
            v-if="opt.type === 'string'"
            :label="opt.description"
            :rules="opt.validation"
            v-model="parameters[opt.name]"
          ></v-text-field>
          <v-text-field
            v-if="opt.type === 'integer'"
            :label="opt.description"
            :rules="opt.validation"
            v-model="parameters[opt.name]"
          ></v-text-field>
          <v-select
            v-if="opt.type === 'list'"
            :label="opt.description"
            :items="opt.values"
            :item-text="opt.textPath"
            :item-value="opt.valuePath"
            v-model="parameters[opt.name]"
            :multiple="opt.multiple ? opt.multiple : false"
          >
            <template slot="selection" slot-scope="data">
              <!-- HTML that describe how select should render selected items -->

              {{
                data.item.name
                  ? `${data.item.name} - ${data.item.id}`
                  : data.item.id
                  ? data.item.id
                  : data.item
              }}
            </template>
            <template slot="item" slot-scope="data">
              <!-- HTML that describe how select should render items when the select is open -->
              {{
                data.item.name
                  ? `${data.item.name} - ${data.item.id}`
                  : data.item.id
                  ? data.item.id
                  : data.item
              }}
            </template>
          </v-select>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  props: {
    id: { type: String, required: true } as PropOptions<String>,
  },
})
</script>