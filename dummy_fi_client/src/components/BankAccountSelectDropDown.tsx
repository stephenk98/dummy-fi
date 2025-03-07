import React from 'react'
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { BankAccount } from '../CustomTypes'
import { convertCentsToDollars } from '../utils'

interface BankAccountSelectDropDownProps {
    bankAccounts: BankAccount[]
    selectedAccount: string
    setSelectedAccount: React.Dispatch<React.SetStateAction<string>>
    label?: string
}

const BankAccountSelectDropDown = React.memo((props: BankAccountSelectDropDownProps) => {
    const { bankAccounts, selectedAccount, setSelectedAccount, label="Select a Bank Account"} = props

    const renderBankAccountDropDownItems = () => {
        return bankAccounts.map((bankAccount) => {
            return <MenuItem value={bankAccount.id}>{`${bankAccount.account_number} ($${convertCentsToDollars(bankAccount.balance)})`}</MenuItem>
        })
    }

    return (
        <FormControl fullWidth variant='outlined'>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedAccount}
                onChange={((e) => setSelectedAccount(e.target.value))}
                label={label}
                style={{ textAlign: 'left'}}
            >
                {bankAccounts && bankAccounts.length > 0
                    ? renderBankAccountDropDownItems()
                    : null
                }
            </Select>
        </FormControl>
    )
})

export default BankAccountSelectDropDown