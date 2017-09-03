<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <display></display>
  </div>
</template>

<script>
  import Display from './components/Display.vue'

export default {
    components: {
      'display': Display
    },
    name: 'app'
}
</script>

