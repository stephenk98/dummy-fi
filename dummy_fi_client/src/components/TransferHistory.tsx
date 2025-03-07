import React from 'react'
import { BankTransfer } from '../CustomTypes'
import styled from 'styled-components'

const TransferHistoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

interface TransferHistoryProps {
    transferHistory: BankTransfer[]
}

const TransferHistory = React.memo((props: TransferHistoryProps) => {
    const { transferHistory } = props

    return (
        <TransferHistoryContainer>
            
        </TransferHistoryContainer>
    )
})

export default TransferHistory