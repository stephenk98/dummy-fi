import React, { useState } from 'react'
import { Customer, ToastNotificationConfig } from '../CustomTypes'
import styled from 'styled-components'
import CustomerSelectDropDown from './CustomerSelectDropDown'
import BankAccountSelectDropDown from './BankAccountSelectDropDown'
import { Button, Typography } from '@mui/material'
import { transferFunds } from '../DummyFIAPI'
import MoneyField from './MoneyField'
import { ArrowForward } from '@mui/icons-material'

const CreateBankTransferFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
`

const BankTransferSidesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
`

const BankTransferSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30%;
`

interface CreateBankTransferFormProps {
    customers: { [id: string]: Customer}
    setCustomers: React.Dispatch<React.SetStateAction<{ [id: string]: Customer }>>
    setToastConfig: React.Dispatch<React.SetStateAction<ToastNotificationConfig>>
}

const CreateBankTransferForm = React.memo((props: CreateBankTransferFormProps) => {
    const { customers, setCustomers, setToastConfig } = props

    const [sender, setSender] = useState<string>("")
    const [senderAccount, setSenderAccount] = useState<string>("")
    const [receiver, setReceiver] = useState<string>("")
    const [receiverAccount, setReceiverAccount] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)

    const updateBalances = () => {
        if (sender !== null && receiver !== null) {
            if (sender === receiver) {
                setCustomers((prev) => ({
                    ...prev,
                    [sender]: {
                        ...prev[sender],
                        bank_accounts: prev[sender].bank_accounts.map(bank_account => 
                            bank_account.id === senderAccount
                                ? {...bank_account, balance: bank_account.balance -= amount}
                                : (bank_account.id === receiverAccount
                                    ? {...bank_account, balance: bank_account.balance += amount}
                                    : bank_account)
                        )
                    }
                }))
            } else {
                setCustomers((prev) => ({
                    ...prev,
                    [sender]: {
                        ...prev[sender],
                        bank_accounts: prev[sender].bank_accounts.map(bank_account => 
                            bank_account.id === senderAccount
                                ? {...bank_account, balance: bank_account.balance -= amount}
                                : bank_account
                        )
                    },
                    [receiver]: {
                        ...prev[receiver],
                        bank_accounts: prev[receiver].bank_accounts.map(bank_account => 
                            bank_account.id === receiverAccount
                                ? {...bank_account, balance: bank_account.balance += amount}
                                : bank_account
                        )
                    }
                }))
            }
        }
        
    }

    const handleTransferFunds = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!sender || !senderAccount || !receiver || !receiverAccount) {
            console.log("Please Select a Sender and Receiver")
        } else if (amount < 0) {
            console.log("Please Enter an Amount Greater than $0")
        } else {
            const transfer = await transferFunds({
                sender: senderAccount,
                receiver: receiverAccount,
                amount: amount
            })

            setSender("")
            setSenderAccount("")
            setReceiver("")
            setReceiverAccount("")
            setAmount(0)

            console.log("TRANSFER", transfer)

            // TODO: make error handling cleaner + less manual
            if (!('non_field_errors' in transfer)) {
                updateBalances()
            }
            setToastConfig({
                open: true,
                message: 'non_field_errors' in transfer ? `Error: ${transfer['non_field_errors'][0]}` :'Funds Transfer Successful',
                severity: 'non_field_errors' in transfer ? 'error' : 'success'
            })

        }
    }

    return (
        <CreateBankTransferFormContainer>
            <Typography variant='h6' color='primary'>
                Send
            </Typography>
            <MoneyField
                amountInCents={amount}
                setAmountInCents={setAmount}
                label='Transfer Amount'
            />
            <BankTransferSidesContainer>
                <BankTransferSide>
                    <Typography variant='h6' color='primary'>
                        From
                    </Typography>
                    <CustomerSelectDropDown
                        customers={customers}
                        selectedCustomer={sender}
                        setSelectedCustomer={setSender}
                    />
                    <BankAccountSelectDropDown
                        bankAccounts={sender !== "" ? customers[sender].bank_accounts : []}
                        selectedAccount={senderAccount}
                        setSelectedAccount={setSenderAccount}
                    />
                </BankTransferSide>
                <ArrowForward color='primary' fontSize='large' />
                <BankTransferSide>
                    <Typography variant='h6' color='primary'>
                        To
                    </Typography>
                    <CustomerSelectDropDown
                        customers={customers}
                        selectedCustomer={receiver}
                        setSelectedCustomer={setReceiver}
                    />
                    <BankAccountSelectDropDown
                        bankAccounts={receiver !== "" ? customers[receiver].bank_accounts : []}
                        selectedAccount={receiverAccount}
                        setSelectedAccount={setReceiverAccount}
                    />
                </BankTransferSide>
            </BankTransferSidesContainer>
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleTransferFunds}
            >
                Transfer Funds
            </Button>
        </CreateBankTransferFormContainer>
    )
})

export default CreateBankTransferForm