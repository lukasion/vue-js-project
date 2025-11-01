<template>
  <v-app>
    <v-layout full-height>
      <sidebar />

      <v-main>
        <v-container
          fluid
          class="pa-0 ma-0 fill-height align-normal"
        >
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import Sidebar from '@/components/Sidebar.vue'

@Component({
  name: 'App',
  components: { Sidebar: Sidebar }
})
class App extends Vue {
  mounted () {
  }
}
let component = App;
(function () { component = toNative(component) })()
export default component
</script>

<style>
#app {
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr !important;
  padding: 0;
}
.v-layout {
  height: 100vh;
}
.align-normal {
  align-items: normal !important;
}
</style>