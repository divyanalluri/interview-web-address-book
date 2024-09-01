import React, { lazy } from 'react';
import SuspenseFallback from './components/SuspenseFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { FullPageErrorFallback } from './components/FullPageErrorFallback';
const AddressBook = lazy(() => import('./views/AddressBook'));
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return <React.Suspense fallback={<SuspenseFallback />}>
    <ErrorBoundary fallbackRender={({ error }) => <FullPageErrorFallback errors={[error as Error]} />}>
      <AddressBook />
    </ErrorBoundary>
  </React.Suspense>;
}

export default App
