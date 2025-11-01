<template>
  <v-list nav>
    <v-list-item
      prepend-icon="mdi-account-multiple"
      :title="$t('employees.title')"
      value="employees"
      class="text-3xl"
      href="/employees"
    />

    <v-list-item
      prepend-icon="mdi-briefcase-account"
      :title="$t('delegations')"
      value="delegations"
    />

    <v-list-item
      prepend-icon="mdi-car-back"
      :title="$t('vehicles')"
      value="vehicles"
    />
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, toNative } from 'vue-facing-decorator'

@Component
export class NavigationList extends Vue {
}
let component = NavigationList;
(function () { component = toNative(component) })()
export default component
</script>
