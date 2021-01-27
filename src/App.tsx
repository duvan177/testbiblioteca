import React, { useEffect } from 'react';
import Root from './routers/routes'
import { initDataBase } from './tools'
function App() {
  useEffect(() => {
    initDataBase()
  }, [])
  return (
  <Root />
  );
}

export default App;
