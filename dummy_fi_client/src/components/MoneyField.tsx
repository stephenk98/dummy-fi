import React from 'react'
import { TextField } from '@mui/material'
import { NumberFormatValues, NumericFormat } from 'react-number-format'
import { convertCentsToDollars } from '../utils'

interface MoneyFieldProps {
    amountInCents: number
    setAmountInCents: React.Dispatch<React.SetStateAction<number>>
    label: string
}


const MoneyField = React.memo((props: MoneyFieldProps) => {
    const { amountInCents, setAmountInCents, label } = props

    const handleValueChange = (values: NumberFormatValues) => {
        const { floatValue } = values
        if (floatValue !== undefined) {
            setAmountInCents(Math.round(floatValue*100))
        }
    }

    return (
        <NumericFormat
            customInput={TextField}
            label={label}
            value={convertCentsToDollars(amountInCents)}
            onValueChange={handleValueChange}
            thousandSeparator=','
            prefix='$'
            decimalScale={2}
            fixedDecimalScale
        />
    )
})

export default MoneyField
