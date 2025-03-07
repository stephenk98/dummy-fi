import React, { useEffect, useState } from 'react';
import './App.css';
import { getCustomers } from './DummyFIAPI';
import { Customer, ToastNotificationConfig } from './CustomTypes';
import ToastNotification from './components/ToastNotification';
import CreateCustomerForm from './components/CreateCustomerForm';
import CreateBankAccountForm from './components/CreateBankAccountForm';
import CreateBankTransferForm from './components/CreateBankTransferForm'

function App() {
  const [customers, setCustomers] = useState<{ [id: string]: Customer }>({})
  const [toastConfig, setToastConfig] = useState<ToastNotificationConfig>({
    open: false,
    message: null,
    severity: 'success',
  })

  const resetToast = () => setToastConfig({
    open: false,
    message: null,
    severity: 'success',
  })

  useEffect(() => {
    getCustomers().then(customers => {
      setCustomers(customers)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <ToastNotification
          open={toastConfig.open}
          resetToast={resetToast}
          message={toastConfig.message}
          severity={toastConfig.severity}
        />
        {/* <CreateCustomerForm
          setCustomers={setCustomers}
          setToastConfig={setToastConfig}
        /> */}
        {/* <CreateBankAccountForm
          customers={customers}
          setCustomers={setCustomers}
          setToastConfig={setToastConfig}
        /> */}
        <CreateBankTransferForm
          customers={customers}
          setCustomers={setCustomers}
          setToastConfig={setToastConfig}
        />
      </header>
    </div>
  );
}

export default App;
