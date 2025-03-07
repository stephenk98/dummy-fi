import React, { useState } from 'react'
import { Customer, CustomerCreateData, ToastNotificationConfig } from '../CustomTypes'
import { createCustomer } from '../DummyFIAPI'
import styled from 'styled-components'
import { TextField, Button } from '@mui/material'

const CreateCustomerFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

interface CreateCustomerFormProps {
    setCustomers: React.Dispatch<React.SetStateAction<{ [id: string]: Customer }>>
    setToastConfig: React.Dispatch<React.SetStateAction<ToastNotificationConfig>>
}

const blankCustomerData: CustomerCreateData = {
    first_name: "",
    last_name: "",
    email: "",
}

const defaultErrorState: any = {
    first_name: false,
    last_name: false,
    email: false,
}

const CreateCustomerForm = ((props: CreateCustomerFormProps) => {
    const { setCustomers, setToastConfig } = props

    const [customerData, setCustomerData] = useState<CustomerCreateData>(blankCustomerData)
    const [errors, setErrors] = useState(defaultErrorState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setCustomerData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(customerData)
        const newCustomer = await createCustomer(customerData)
        setCustomers((prev) => ({
            ...prev,
            [newCustomer.id]: newCustomer
        }))
        setCustomerData(blankCustomerData)
        setErrors(defaultErrorState)
        setToastConfig({
            open: true,
            message: 'Customer Successfully Added',
            severity: 'success'
        })
    }

    return (
        <CreateCustomerFormContainer>
            <TextField
                label='First Name'
                value={customerData.first_name}
                name='first_name'
                variant='outlined'
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label='Last Name'
                value={customerData.last_name}
                name='last_name'
                variant='outlined'
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label='Email'
                value={customerData.email}
                name='email'
                type='email'
                variant='outlined'
                fullWidth
                onChange={handleChange}
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleSubmit}
            >
                Add Customer
            </Button>
        </CreateCustomerFormContainer>
    )

})

export default CreateCustomerForm