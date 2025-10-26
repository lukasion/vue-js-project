<template>
  <v-navigation-drawer
    class="border-e-0"
    permanent
  >
    <navigation-avatar />
    <navigation-list />

    <template #append>
      <v-list
        class="border-t-thin"
        nav
      >
        <v-list-item
          prepend-icon="mdi-cog-outline"
          :title="$t('settings')"
          value="settings"
        />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, toNative } from 'vue-facing-decorator'
import { State } from "@/utils/PiniaDecorators"
import { useSettingsStore } from "@/stores/settings.store"
import NavigationAvatar from "@/components/NavigationAvatar.vue"
import NavigationList from "@/components/NavigationList.vue"

@Component({
  components: {
    NavigationAvatar, NavigationList
  }
})
export class Settings extends Vue {
  @State(useSettingsStore)
  companyName: string
}
let component = Settings;
(function () { component = toNative(component) })()
export default component
</script>

<style scoped>
.v-list-item :deep(.v-list-item-title) {
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
}
</style>
