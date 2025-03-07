export interface CustomerCreateData {
    first_name: string
    last_name: string
    email: string
}

export interface Customer extends CustomerCreateData {
    id: string,
    bank_accounts: BankAccount[]
}

export interface BankAccountCreateData {
    customer: string
    initial_deposit?: number
}

export interface BankAccount {
    id: string
    account_number: string
    customer: Customer
    balance: number
    transfers_sent: BankTransfer[]
    transfers_received: BankTransfer[]
}

export interface BankTransferCreateData {
    amount: number
    sender: string
    receiver: string
}

export interface BankTransfer extends BankTransferCreateData {
    id: string
}

export interface ToastNotificationConfig {
    open: boolean
    message: string | null
    severity: 'success' | 'error'
}