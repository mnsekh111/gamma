<template>
  <div>
    <v-container>
      <v-card class="elevation-12">
        <v-card-title primary-title>
          <div>
            <v-icon class="display-4">desktop_windows</v-icon>
            <h3 class="headline mb-0">{{display.name}}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-card class="pa-3 ma-3">
                <h3 class="title">Gamma</h3>
                <v-layout row wrap>
                  <v-flex xs12 sm2>
                    <v-icon class="red--text">lightbulb_outline</v-icon>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <v-slider v-model="display.gamma.red" thumb-label min="10" max="100"></v-slider>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <div class="red--text body-2 text-xs-center"> ({{display.gamma.red}}) </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm2>
                    <v-icon class="green--text">lightbulb_outline</v-icon>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <v-slider v-model="display.gamma.green" thumb-label min="10" max="100"></v-slider>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <div class="green--text body-2 text-xs-center"> ({{display.gamma.green}}) </div>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm2>
                    <v-icon class="blue--text">lightbulb_outline</v-icon>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <v-slider v-model="display.gamma.blue" thumb-label min="10" max="100"></v-slider>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <div class="blue--text body-2 text-xs-center"> ({{display.gamma.blue}}) </div>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
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
<style scoped>
  .headline {
    display: inline-block;
    padding-left: 10px;
  }
</style>
