<template>
  <v-card
    class="pa-8 border mt-6 bg-squared rounded-xl"
    elevation="0"
    width="100%"
  >
    <v-card-title class="text-h4 font-weight-bold">
      {{ $t('settings') }}
    </v-card-title>

    <v-card-text>
      <v-card
        class="pa-8 border rounded-xl"
        elevation="0"
      >
        test
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({
  name: 'Settings',
  components: {  }
})
class Settings extends Vue {
  mounted() {
  }
}
let component = Settings;
(function () { component = toNative(component) })()
export default component
</script>

<style>
.bg-squared {
  --tile: 50px;
  --bg: #fafafa;
  --line: rgba(0,0,0,0.03);
  width: 320px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--bg);

  background-image:
      linear-gradient(to right, transparent 0 calc(var(--tile) - 1px), var(--line) calc(var(--tile) - 1px) var(--tile)),
      linear-gradient(to bottom, transparent 0 calc(var(--tile) - 1px), var(--line) calc(var(--tile) - 1px) var(--tile));
  background-size: var(--tile) var(--tile);
  box-shadow: 0 6px 18px rgba(15,20,25,0.08);
}
</style>
