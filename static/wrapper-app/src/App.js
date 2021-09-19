import React, { useEffect, useState } from 'react';
import { invoke, Modal } from '@forge/bridge';
import Button from '@atlaskit/button/standard-button';

function App() {
  const [summary, setSummary] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    (async () => {
      // Can be done using resolvers
      // TO get the issue details, i.e. summary and description
      const data = await invoke('getIssue');

      const { summary: issueSummary, description: issueDescription } =
        data.fields;

      // checking if summary exists and setting it
      setSummary(issueSummary ? issueSummary : null);
      // checking if description exists and setting it
      setDescription(
        issueDescription && issueDescription.content[0].content[0].text
          ? issueDescription.content[0].content[0].text
          : null
      );
    })();
    return () => {};
  }, []);

  const openModal = () => {
    const modal = new Modal({
      resource: 'modaldialog',
      onClose: (payload) => {},
      size: 'medium',
      context: {
        description,
        summary,
      },
    });
    modal.open();
  };

  return (
    <>
      <Button
        appearance="primary"
        onClick={openModal}
        isDisabled={!description || !summary}
      >
        Open Sample App!
      </Button>
    </>
  );
}

export default App;
