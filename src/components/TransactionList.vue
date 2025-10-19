<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
      <div class="d-flex align-center justify-space-between w-100">
        <div>
          <h3 class="mb-0">
            Transactions
          </h3>
          <div class="text-subtitle-2">
            Recent activity & filtering
          </div>
        </div>

        <div class="d-flex gap-3 align-center">
          <v-text-field
            v-model="filters.search"
            placeholder="Search (merchant, notes, id...)"
            clearable
            density="compact"
            hide-details
            prepend-inner-icon="mdi-magnify"
            style="min-width: 260px"
          />

          <v-select
            v-model="filters.type"
            :items="typeOptions"
            dense
            hide-details
            style="width: 160px"
            label="Type"
            clearable
          />

          <v-btn
            variant="tonal"
            density="compact"
            @click="exportCsv"
          >
            <v-icon left>
              mdi-export
            </v-icon>
            Export CSV
          </v-btn>
        </div>
      </div>
    </v-card-title>

    <v-data-table
      v-model:page="page"
      v-model:sort-desc="sortDesc"
      :items="pagedTransactions"
      :headers="headers"
      :items-per-page="itemsPerPage"
      class="elevation-0"
      item-key="id"
      dense
      show-select
    >
      <template #item.merchant="{ item }">
        <div class="d-flex align-center">
          <v-avatar
            size="36"
            class="me-3"
          >
            <img
              :src="item.avatar"
              alt="avatar"
            >
          </v-avatar>
          <div>
            <div class="font-weight-medium">
              {{ item.merchant }}
            </div>
            <div class="text-caption text--secondary">
              {{ item.category }}
            </div>
          </div>
        </div>
      </template>

      <template #item.amount="{ item }">
        <div :class="{'text-negative': item.amount < 0, 'text-positive': item.amount >= 0}">
          {{ formatCurrency(item.amount) }}
        </div>
      </template>

      <template #item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>

      <template #item.actions="{ item }">
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="viewDetails(item)">
              <v-list-item-title>View details</v-list-item-title>
            </v-list-item>
            <v-list-item @click="flagTransaction(item)">
              <v-list-item-title>Flag</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteTransaction(item)">
              <v-list-item-title class="text-error">
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template #top>
        <div class="d-flex align-center px-4 pb-2">
          <div class="text-caption">
            Showing {{ filteredTransactions.length }} transactions
          </div>
          <div class="flex-grow-1" />

          <v-select
            v-model="itemsPerPage"
            :items="[5, 10, 20, 50, 100]"
            hide-details
            dense
            style="width: 100px"
            label="Per page"
          />
        </div>
      </template>

      <template #no-data>
        <v-card-text class="text-center py-12">
          No transactions found.
        </v-card-text>
      </template>
    </v-data-table>

    <v-card-actions class="justify-space-between">
      <div class="text-caption">
        Page {{ page }} · Sorted by {{ sortBy || 'date' }} {{ sortDesc ? 'desc' : 'asc' }}
      </div>
      <v-pagination
        v-model="page"
        :length="pageCount"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator'
import { Transaction, TransactionFilterOptions, TransactionHeader } from "@/types/Transactions"

@Component
export default class TransactionList extends Vue {
  private _transactions: Transaction[] = [
    {
      id: 'tx_001',
      date: '2025-10-10T14:23:00Z',
      merchant: 'Café Rosa',
      avatar: 'https://i.pravatar.cc/40?img=12',
      category: 'Food & Drink',
      amount: -12.5,
      currency: 'EUR',
      status: 'Settled',
      notes: 'Latte & croissant',
    },
    {
      id: 'tx_002',
      date: '2025-10-09T09:10:00Z',
      merchant: 'Acme Co — Subscription',
      avatar: 'https://i.pravatar.cc/40?img=5',
      category: 'Subscriptions',
      amount: -9.99,
      currency: 'EUR',
      status: 'Pending',
      notes: 'Monthly plan',
    },
    {
      id: 'tx_003',
      date: '2025-10-08T20:30:00Z',
      merchant: 'ACME Refund',
      avatar: 'https://i.pravatar.cc/40?img=15',
      category: 'Refund',
      amount: 25.0,
      currency: 'EUR',
      status: 'Settled',
      notes: 'Refund for order #9832',
    },
  ]

  protected filters: TransactionFilterOptions = { search: '', type: null }
  protected typeOptions: string[] = ['All', 'Expense', 'Income', 'Pending', 'Settled']
  protected itemsPerPage = 10
  protected page = 1
  protected sortBy = 'date'
  protected sortDesc = true

  readonly headers: TransactionHeader[] = [
    { title: 'Date', key: 'date', value: 'date', sortable: true },
    { title: 'Merchant', key: 'merchant', value: 'merchant', sortable: true },
    { title: 'Amount', key: 'amount', value: 'amount', sortable: true },
    { title: 'Status', key: 'status', value: 'status', sortable: true },
    { title: 'Actions', key: 'actions', value: 'actions', sortable: false },
  ]

  get transactions(): Transaction[] {
    return this._transactions
  }

  set transactions(val: Transaction[]) {
    console.log('Transactions updated:', val.length)
    this._transactions = val
  }

  get filteredTransactions(): Transaction[] {
    const q = (this.filters.search || '').toLowerCase().trim()
    const type = this.filters.type

    return this._transactions
      .filter(t => {
        if (q) {
          const hay = `${t.merchant} ${t.category} ${t.id} ${t.notes}`.toLowerCase()
          if (!hay.includes(q)) return false
        }

        if (type && type !== 'All') {
          if (type === 'Expense' && t.amount >= 0) return false
          if (type === 'Income' && t.amount < 0) return false
          if (type === 'Pending' && t.status.toLowerCase() !== 'pending') return false
          if (type === 'Settled' && t.status.toLowerCase() !== 'settled') return false
        }

        return true
      })
      .sort((a, b) => {
        const key = this.sortBy || 'date'
        let av: any = a[key as keyof Transaction]
        let bv: any = b[key as keyof Transaction]

        if (key === 'date') {
          av = new Date(a.date).getTime()
          bv = new Date(b.date).getTime()
        }

        if (av < bv) return this.sortDesc ? 1 : -1
        if (av > bv) return this.sortDesc ? -1 : 1
        return 0
      })
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredTransactions.length / this.itemsPerPage))
  }

  get pagedTransactions(): Transaction[] {
    const start = (this.page - 1) * this.itemsPerPage
    return this.filteredTransactions.slice(start, start + this.itemsPerPage)
  }

  protected formatCurrency(n: number): string {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(n)
  }

  protected formatDate(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  protected viewDetails(item: Transaction): void {
    alert(JSON.stringify(item, null, 2))
  }

  protected flagTransaction(item: Transaction): void {
    alert(`Flagged ${item.id}`)
  }

  protected deleteTransaction(item: Transaction): void {
    if (!confirm(`Delete transaction ${item.id}?`)) return
    const idx = this._transactions.findIndex(t => t.id === item.id)
    if (idx >= 0) this._transactions.splice(idx, 1)
  }

  protected exportCsv(): void {
    const rows = [
      ['id', 'date', 'merchant', 'category', 'amount', 'currency', 'status', 'notes'],
      ...this.filteredTransactions.map(t => [
        t.id,
        t.date,
        t.merchant,
        t.category,
        t.amount,
        t.currency,
        t.status,
        t.notes || '',
      ]),
    ]

    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }
}
</script>

<style scoped>
.text-negative {
  color: #b00020;
}
.text-positive {
  color: #166534;
}
</style>
