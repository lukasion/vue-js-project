<template>
  <v-card
    class="pa-8 border mt-6 bg-squared rounded-xl"
    elevation="0"
    width="100%"
  >
    <v-card-title class="text-h4 font-weight-bold">
      {{ $t('employees.title') }}
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
          <p>
            {{ $t('employees.info') }}
          </p>
        </v-alert>

        {{ employees.length }} Employees found.

        <v-table
          :items="employees"
          class="mt-6"
          dense
          outlined
        >
          <thead>
            <tr>
              <th>{{ $t('employees.firstName') }}</th>
              <th>{{ $t('employees.lastName') }}</th>
              <th>{{ $t('employees.position') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="employee in employees"
              :key="employee.id"
            >
              <td>
                <v-text-field
                  v-model="employee.firstName"
                  outlined
                  dense
                  variant="outlined"
                />
              </td>
              <td>
                <v-text-field
                  v-model="employee.lastName"
                  outlined
                  dense
                  variant="outlined"
                />
              </td>
              <td>
                <v-text-field
                  v-model="employee.position"
                  outlined
                  dense
                  variant="outlined"
                />
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-btn 
          color="primary"
          variant="contained"
          class="mt-6"
        >
          {{ $t('employees.addEmployee') }}
        </v-btn>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { useEmployeesStore } from '@/stores/employees.store'
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { State } from '@/utils/PiniaDecorators'

@Component({
  name: 'Employees',
  components: {  }
})
class Employees extends Vue {
  @State(useEmployeesStore, 'employees') 
  employees!: Employees[]
  // test
}
let component = Employees;
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
