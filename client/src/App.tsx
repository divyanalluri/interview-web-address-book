import React, { lazy } from 'react';
import SuspenseFallback from './components/SuspenseFallback';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddressBook = lazy(() => import('./views/AddressBook'));

function App() {

  return <React.Suspense fallback={<SuspenseFallback />}>
    <AddressBook />
  </React.Suspense>;
}

export default App
