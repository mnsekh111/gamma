<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <app-header :appName="name" :appVersion="version"></app-header>
    <display :detail="displays[0]"></display>
  </div>
</template>

<script>
  import Display from './components/Display.vue'
  import AppHeader from './components/AppHeader.vue'

  export default {
    components: {
      'appHeader': AppHeader,
      'display': Display
    },
    data:
      function () {
        return {
          name: 'gamma',
          version: '1.0',
          displays: [{
            name: 'HDMI1',
            gamma: {
              red: 1.2,
              green: 1.2,
              blue: 1.2
            }
          }]
        }
      }
  }
</script>

