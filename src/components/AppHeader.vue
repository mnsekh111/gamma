<template>
  <v-toolbar class="primary">
    <v-toolbar-title class="white--text">{{appName}} {{appVersion}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="refresh">
      <v-icon class="white--text">refresh</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    props: {
      appName: {
        type: String
      },
      appVersion: {
        type: String
      }
    },
    methods: {
      refresh () {
        console.log('refreshin....')
      }
    }
  }
</script>
