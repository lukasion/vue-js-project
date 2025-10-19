import { defineStore } from 'pinia'
import type { TransactionsState } from '@/types/Transactions'

export const useTransactionsStore = defineStore('transactions', {
  state: (): TransactionsState => ({
    id: 5
  }),

  getters: {},

  actions: {

  },
})
