import React from 'react'
import { BankAccount, Customer } from '../CustomTypes'
import styled from 'styled-components'

const BankTransferRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

interface BankTransferRowProps {
    currentCustomerId: string
    senderAccount: BankAccount
    senderCustomer: Customer
    receiverAccount: BankAccount
    receiverCustomer: Customer
    amount: number
}

const BankTransferRow = React.memo((props: BankTransferRowProps) => {
    const { currentCustomerId, senderAccount, senderCustomer, receiverAccount, receiverCustomer, amount } = props

    return (
        <BankTransferRowContainer></BankTransferRowContainer>
    )
})

export default BankTransferRowContainer