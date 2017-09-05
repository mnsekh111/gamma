<template>
  <div id="app">
    <v-app>
      <app-header :appName="name" :appVersion="version"></app-header>
      <display v-for="display in displays" :display="display" :key="display.name"></display>
      <app-footer></app-footer>
    </v-app>
  </div>
</template>

<script>
  import Display from './components/Display.vue'
  import AppHeader from './components/AppHeader.vue'
  import AppFooter from './components/AppFooter.vue'

  export default {
    components: {
      'appHeader': AppHeader,
      'display': Display,
      'appFooter': AppFooter
    },
    methods: {
      fetchDisplays () {
        console.log(this)
        this.$http.get('http://localhost:3000/displays').then(response => {
          this.displays = response.body
          this.formatDisplays()
        }, response => {
          // error callback
          alert('error')
        })
      },
      formatDisplays () {
        for (let display in this.displays) {
          this.displays[display].gamma.red = (1.0 / (this.displays[display].gamma.red)) * 50.0
          this.displays[display].gamma.green = (1.0 / (this.displays[display].gamma.green)) * 50.0
          this.displays[display].gamma.blue = (1.0 / (this.displays[display].gamma.blue)) * 50.0
          this.displays[display].brightness = this.displays[display].brightness * 50
        }
        console.log(this.displays)
      },
      copy (obj) {
        return JSON.parse(JSON.stringify(obj))
      }
    },
    mounted () {
      this.fetchDisplays()
    },
    data:
      function () {
        return {
          name: 'gamma',
          version: '1.0',
          displays: {}
        }
      }
  }
</script>

