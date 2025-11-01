<template>
  <v-card
    class="pa-8 border mt-6 bg-squared rounded-xl"
    elevation="0"
    width="100%"
  >
    <v-card-title class="text-h4 font-weight-bold">
      {{ $t('settings.title') }}
    </v-card-title>

    <v-card-text>
      <v-card
        class="pa-8 border rounded-xl"
        elevation="0"
      >
        <v-alert
          type="info"
          dense
          variant="tonal"
          closable
          close-label="Close Alert"
          color="deep-purple-accent-4 mb-6"
        >
          <p class="font-weight-bold">
            {{ $t('settings.info') }}
          </p>
          
          <p>{{ $t('settings.info2') }}</p>
        </v-alert>

        <v-text-field
          v-model="companyName"
          :label="$t('settings.company')"
          outlined
          dense
          variant="outlined"
        />

        <v-text-field
          v-model="nipNumber"
          :label="$t('settings.nipNumber')"
          outlined
          dense
          variant="outlined"
        />

        <v-text-field
          v-model="address"
          :label="$t('settings.address')"
          outlined
          dense
          variant="outlined"
        />

        <div class="text-right">
          <v-btn
            color="primary"
            variant="contained"
            @click.prevent="updateSettings({ companyName, nipNumber, address })"
          >
            {{ $t('common.save') }}
          </v-btn>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Action, State } from '@/utils/PiniaDecorators'
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { useSettingsStore } from '@/stores/settings.store'
import { AppSettings } from '@/types/AppSettings'

@Component({
  name: 'Settings',
  components: {  }
})
class Settings extends Vue {
  @State(useSettingsStore, 'companyName') 
  companyName!: string

  @State(useSettingsStore, 'nipNumber')
  nipNumber!: string | null

  @State(useSettingsStore, 'address')
  address!: string | null

  @Action(useSettingsStore)
  updateSettings!: (payload: AppSettings) => void
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
