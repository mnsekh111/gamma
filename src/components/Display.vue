<template>
  <div data-app>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{detail.name}}</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
        </div>
      </v-card-title>
      <v-card-text>
          <v-slider v-model="detail.gamma.red" thumb-label step="10"></v-slider>
          <v-slider v-model="detail.gamma.green" thumb-label step="10" snap></v-slider>
          <v-slider v-model="detail.gamma.blue" thumb-label step="10" snap></v-slider>
      </v-card-text>
      <v-card-actions>
        <v-btn outline class="green--text" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'display',
    props: {
      detail: {
        type: Object
      }
    },
    methods: {
      save () {
        console.log('Saving' + this.name)
      }
    }
  }
</script>
