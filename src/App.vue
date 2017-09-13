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
  import {EventBus} from './main.js'

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
          this.setDisplays(response.body)
        }, response => {
          // error callback
          alert('error')
        })
      },
      setDisplays (displays) {
        this.displays = displays
        for (let name in this.displays) {
          this.displays[name].gamma.red = (1.0 / (displays[name].gamma.red)) * 50.0
          this.displays[name].gamma.green = (1.0 / (displays[name].gamma.green)) * 50.0
          this.displays[name].gamma.blue = (1.0 / (displays[name].gamma.blue)) * 50.0
          this.displays[name].brightness = displays[name].brightness * 50
          this.displaysCopy[name] = this.copyDisplay(this.displays[name])
        }
      },
      reformat (display) {
        let copy = this.copyDisplay(display)
        copy.gamma.red = display.gamma.red / 50.0
        copy.gamma.green = display.gamma.green / 50.0
        copy.gamma.blue = display.gamma.blue / 50.0
        copy.brightness = display.brightness / 50
        return copy
      },
      registerEventListeners () {
        EventBus.$on('EventSave', (data) => {
          this.$http.post('http://localhost:3000/displays', this.reformat(data)).then(response => {
            console.log(response.statusCode)
          }, response => {
            // error callback
          })
        })
      },
      copyDisplay (display) {
        let copy = { }
        copy.name = display.name
        copy.gamma = {}
        copy.resolution = {}
        copy.gamma.red = display.gamma.red
        copy.gamma.green = display.gamma.green
        copy.gamma.blue = display.gamma.blue
        copy.brightness = display.brightness
        copy.resolution = display.resolution
        return copy
      }
    },
    mounted () {
      this.fetchDisplays()
      this.registerEventListeners()
    },
    data:
      function () {
        return {
          name: 'gamma',
          version: '1.0',
          displays: {},
          displaysCopy: {}
        }
      }
  }
</script>

