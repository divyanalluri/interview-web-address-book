import React from 'react';
import SuspenseFallback from './components/SuspenseFallback';
import AddressBook from './views/AddressBook';

function App() {

  return <React.Suspense fallback={<SuspenseFallback />}>
    <AddressBook />
  </React.Suspense>;
}

export default App
