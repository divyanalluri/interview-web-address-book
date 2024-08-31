import React, { lazy } from 'react';
import SuspenseFallback from './components/SuspenseFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { FullPageErrorFallback } from './components/FullPageErrorFallback';
const AddressBook = lazy(() => import('./views/AddressBook'));

function App() {

  return <React.Suspense fallback={<SuspenseFallback />}>
    <ErrorBoundary fallbackRender={({ error }) => <FullPageErrorFallback errors={[error as Error]} />}>
      <AddressBook />
    </ErrorBoundary>
  </React.Suspense>;
}

export default App
