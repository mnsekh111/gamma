<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn outline class="green--text">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'display',
    data: function () {
      return {
        display: {
          name: null,
          gamma: {
            red: NaN,
            green: NaN,
            blue: NaN
          },
          resolution: {
            width: NaN,
            height: NaN
          },
          brightness: NaN
        }
      }
    }
  }
</script>
