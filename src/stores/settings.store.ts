import { defineStore } from 'pinia'
import type { AppSettings } from '@/types/AppSettings'

export const useSettingsStore = defineStore('settings', {
  state: (): AppSettings => ({
    companyName: '',
    nipNumber: null,
    address: null,
  }),
  actions: {
    updateSettings (payload: AppSettings) {
      this.$patch(payload)
    },
  },
  persist: true
})

