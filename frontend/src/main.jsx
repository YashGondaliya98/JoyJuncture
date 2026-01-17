import React from 'react';
import ReactDOM from 'react-dom/client';

function TestApp() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>✅ React App is Working!</h1>
      <p>If you see this, the deployment is successful.</p>
      <p>Environment: {import.meta.env.MODE}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <TestApp />
);