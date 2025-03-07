import React from 'react'
import { Customer } from '../CustomTypes'
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material'

interface CustomerSelectDropDownProps {
    customers: { [key: string]: Customer }
    selectedCustomer: string
    setSelectedCustomer: React.Dispatch<React.SetStateAction<string>>
    label?: string
}

const CustomerSelectDropDown = React.memo((props: CustomerSelectDropDownProps) => {
    const { customers, selectedCustomer, setSelectedCustomer, label='Select a Customer' } = props

    const renderCustomerDropDownItems = () => {
        return Object.values(customers).map((customer) => {
            return <MenuItem key={customer.id} value={customer.id}>{`${customer.first_name} ${customer.last_name} (${customer.email})`}</MenuItem>
        })
    }

    return (
        <FormControl fullWidth variant='outlined'>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value as string)}
                label={label}
                style={{ textAlign: 'left' }}
            >
                {customers && Object.values(customers).length > 0
                    ? renderCustomerDropDownItems()
                    : null
                }
            </Select>
        </FormControl>
    )
})

export default CustomerSelectDropDown