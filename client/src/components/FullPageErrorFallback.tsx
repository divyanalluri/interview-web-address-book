import React from 'react';

export const FullPageErrorFallback: React.FC<{ errors: Array<Error | undefined>, height?: string }> =
  ({ errors, height = `100%` }) =>
    <div
      role="alert"
      style={{
        alignItems: `center`,
        color: `#ef5350`,
        display: `flex`,
        flexDirection: `column`,
        height,
        justifyContent: `center`,
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      {errors?.map((e) => e && <pre>{e.message}</pre>)}
      <button 
          onClick={() => window.location.reload()} 
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#f44336',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
    </div>;