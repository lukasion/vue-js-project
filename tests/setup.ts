import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

setActivePinia(createPinia())

config.global.mocks = {
  $t: (msg: string) => msg,
}

config.global.stubs = {
  'v-card': { template: '<div><slot /></div>' },
  'v-card-title': { template: '<div><slot /></div>' },
  'v-card-text': { template: '<div><slot /></div>' },
  'v-alert': { template: '<div><slot /></div>' },
  'v-text-field': {
    props: ['modelValue', 'label'],
    emits: ['update:modelValue'],
    template: `
      <input
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    `
  },
  'v-btn': {
    props: ['color'],
    template: `<button><slot /></button>`
  }
}