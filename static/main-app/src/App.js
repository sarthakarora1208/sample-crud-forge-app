import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Textfield from '@atlaskit/textfield';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return <div>{data ? data : 'Loading...'}</div>;
}

export default App;
