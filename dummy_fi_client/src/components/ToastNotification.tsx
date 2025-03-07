import React from 'react'

import { Snackbar, Alert } from '@mui/material'

interface ToastNotificationProps {
    open: boolean
    resetToast: () => void
    severity: 'success' | 'error'
    message: string | null
}

const ToastNotification = React.memo((props: ToastNotificationProps) => {
    const { open, resetToast, severity, message } = props
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => resetToast()}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={severity} onClose={() => resetToast()}>
                {message}
            </Alert>
        </Snackbar>
    )
})

export default ToastNotification