import { Customer, BankAccount, BankTransfer, CustomerCreateData, BankAccountCreateData, BankTransferCreateData  } from "./CustomTypes";

const API_BASE_URL = "http://localhost:8000/api"

export const getCustomers = async (): Promise<{str: Customer}> => {
    const response = await fetch(`${API_BASE_URL}/customers/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

export const getBankAccounts = async (): Promise<{str: BankAccount}> => {
    const response = await fetch(`${API_BASE_URL}/bank_accounts/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

export const getBankTransfers = async (): Promise<BankTransfer[]> => {
    const response = await fetch(`${API_BASE_URL}/bank_transfers/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

export const createCustomer = async (data: CustomerCreateData): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const createBankAccount = async (data: BankAccountCreateData): Promise<BankAccount> => {
    const response = await fetch(`${API_BASE_URL}/bank_accounts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const transferFunds = async (data: BankTransferCreateData): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bank_transfers/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export const getAccountTransfers = async (accountNumber: string): Promise<BankTransfer> => {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountNumber}/transfer_history/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}