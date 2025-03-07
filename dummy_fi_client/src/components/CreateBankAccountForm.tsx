import React, { useState } from 'react'
import { Customer, ToastNotificationConfig } from '../CustomTypes'
import { createBankAccount } from '../DummyFIAPI'
import styled from 'styled-components'
import { Button } from '@mui/material'
import MoneyField from './MoneyField'
import CustomerSelectDropDown from './CustomerSelectDropDown'

const CreateBankAccountFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
`

interface CreateBankAccountFormProps {
    customers: { [id: string]: Customer }
    setCustomers: React.Dispatch<React.SetStateAction<{ [id: string]: Customer }>>
    setToastConfig: React.Dispatch<React.SetStateAction<ToastNotificationConfig>>
}

const CreateBankAccountForm = ((props: CreateBankAccountFormProps) => {
    const { customers, setCustomers, setToastConfig } = props

    const [initialDeposit, setInitialDeposit] = useState<number>(0)
    const [selectedCustomer, setSelectedCustomer] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedCustomer) {
            console.log("Please Select a Customer")
        } else {
            const newBankAccount = await createBankAccount({
                initial_deposit: initialDeposit,
                customer: selectedCustomer
            })
            setCustomers((prev) => ({
                ...prev,
                [selectedCustomer]: {
                    ...prev[selectedCustomer],
                    bank_accounts: [
                        ...prev[selectedCustomer].bank_accounts,
                        newBankAccount
                    ]
                }
            }))
            setInitialDeposit(0)
            setSelectedCustomer("")
            setToastConfig({
                open: true,
                message: 'Bank Account Successfully Created',
                severity: 'success'
            })
        }
    }

    return (
        <CreateBankAccountFormContainer>
            <CustomerSelectDropDown
                customers={customers}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
            />
            <MoneyField
                label='Initial Deposit Amount'
                amountInCents={initialDeposit}
                setAmountInCents={setInitialDeposit}
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleSubmit}
            >
                Add Bank Account
            </Button>
        </CreateBankAccountFormContainer>
    )

})

export default CreateBankAccountForm