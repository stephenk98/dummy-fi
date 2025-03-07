import React from 'react'
import styled from 'styled-components'
import { Customer } from '../CustomTypes'

const CustomerListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export interface CustomerListProps {
    customers: { str: Customer } | null
}

const CustomerList = React.memo((props: CustomerListProps) => {
    const { customers } = props

    return (
        <CustomerListContainer>
            {customers && Object.keys(customers)}
        </CustomerListContainer>
    )
})

export default CustomerList