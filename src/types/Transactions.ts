export interface Transaction {
    id: string
    date: string
    merchant: string
    avatar: string
    category: string
    amount: number
    currency: string
    status: string
    notes?: string
}

export interface TransactionHeader {
    title: string
    key: string
    value: string
    sortable: boolean
}
export interface TransactionFilterOptions {
    search: string
    type: string | null
}


export interface TransactionsState {
    transactions: Transaction[]
}
