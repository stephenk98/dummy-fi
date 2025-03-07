import React, { useEffect, useState } from 'react';
import './App.css';
import { getCustomers } from './DummyFIAPI';
import { Customer, ToastNotificationConfig } from './CustomTypes';
import ToastNotification from './components/ToastNotification';
import CreateCustomerForm from './components/CreateCustomerForm';
import CreateBankAccountForm from './components/CreateBankAccountForm';
import CreateBankTransferForm from './components/CreateBankTransferForm'
import styled from 'styled-components'
import { Divider } from '@mui/material';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90%;
`

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  grid-gap: 2rem;
  width: 100%;
`

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
        <AppContainer>
          <ToastNotification
            open={toastConfig.open}
            resetToast={resetToast}
            message={toastConfig.message}
            severity={toastConfig.severity}
          />
          <TopContainer>
          <CreateCustomerForm
            setCustomers={setCustomers}
            setToastConfig={setToastConfig}
          />
          <Divider orientation='vertical'  />
          <CreateBankAccountForm
            customers={customers}
            setCustomers={setCustomers}
            setToastConfig={setToastConfig}
          />
          </TopContainer>
          <Divider />
          <CreateBankTransferForm
            customers={customers}
            setCustomers={setCustomers}
            setToastConfig={setToastConfig}
          />
        </AppContainer>
      </header>
    </div>
  );
}

export default App;
