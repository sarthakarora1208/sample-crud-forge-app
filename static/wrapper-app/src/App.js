import React from 'react';
import { Modal } from '@forge/bridge';
import Button from '@atlaskit/button/standard-button';

function App() {
  const openModal = () => {
    const modal = new Modal({
      resource: 'modaldialog',
      onClose: (payload) => {
        console.log('onClose called with', payload);
      },
      size: 'medium',
    });
    modal.open();
  };

  return (
    <>
      <Button appearance="primary" onClick={openModal}>
        Open Sample App!
      </Button>
    </>
  );
}

export default App;
