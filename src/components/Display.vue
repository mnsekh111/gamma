<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{display.name}}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-slider label="Red" v-model="display.gamma.red" thumb-label min="10" max="100"></v-slider>
          <v-slider label="Green" v-model="display.gamma.green" thumb-label min="10" max="100"></v-slider>
          <v-slider label="Blue" v-model="display.gamma.blue" thumb-label min="10" max="100"></v-slider>
        </v-card-text>
        <v-card-actions>
          <v-btn outline class="green--text" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import {EventBus} from '../main.js'

  export default {
    name: 'display',
    props: {
      display: {
        type: Object,
        required: true
      }
    },
    methods: {
      save () {
        console.log('Saving ' + this.display.name)
        EventBus.$emit('EventSave', this.display)
      }
    }
  }
</script>

