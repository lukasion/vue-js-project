<template>
  <main>
    <transaction-list />
  </main>
</template>

<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'
import TransactionList from '@/components/TransactionList.vue'

@Component({
  name: 'App',
  components: { TransactionList }
})
class App extends Vue {
  mounted() {
  }
}
let component = App;
(function () { component = toNative(component) })()
export default component
</script>
