import React, { useEffect, useState } from 'react';
import { view, invoke, requestJira } from '@forge/bridge';
import Textfield from '@atlaskit/textfield';
import Spinner from '@atlaskit/spinner';
import { checkResponse } from './utils/checkResponse';
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';
import TextArea from '@atlaskit/textarea';

function App() {
  const [summary, setSummary] = useState(null);
  const [description, setDescription] = useState(null);
  const [context, setContext] = useState({});

  useEffect(() => {
    (async () => {
      const context = await view.getContext();
      setContext(context);
      const { description, summary } = context.extension.modal;
      setDescription(description);
      setSummary(summary);

      setTimeout(() => {
        getRandomData();
      }, 3000);
    })();
  }, []);

  // getRandomData from api
  const getRandomData = async () => {
    const { title, body } = await invoke('getPostData', {
      postId: Math.floor(Math.random() * 4 + 1),
    });
    // replace the title
    setSummary(title);
    // replace the description
    setDescription(body.replace(/(\r\n|\n|\r)/gm, '. '));
  };

  // const getIssueDetails = async (currentIssueKey) => {
  //   const issueResponse = await requestJira(
  //     `/rest/api/3/issue/${currentIssueKey}?fields=summary,description`
  //   );

  //   await checkResponse('Jira API', issueResponse);
  //   const data = issueResponse.body;

  //   const { summary, description } = data.fields;

  //   setSummary(summary ? summary : null);

  //   setDescription(
  //     description.content[0].content[0].text
  //       ? description.content[0].content[0].text
  //       : null
  //   );
  // };

  return (
    <div
      style={{
        padding: '2rem',
        flex: 1,
        position: 'relative',
      }}
    >
      <span className="modal-header">{'Sample App'}</span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {summary === null || description === null ? (
          <Spinner size="large" />
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div style={{ marginTop: '2rem', width: '100%' }}>
              <Field label="Summary" name="summary">
                {({ fieldProps }) => (
                  <Textfield
                    placeholder="Summary"
                    name="summary"
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                    }}
                  />
                )}
              </Field>
            </div>
            <div
              style={{ marginTop: '1rem', width: '100%', marginBottom: '2rem' }}
            >
              <Field label="Description" name="description">
                {({ fieldProps }) => (
                  <TextArea
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    minimumRows={10}
                  />
                )}
              </Field>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          float: 'right',
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: '1rem 1rem',
        }}
      >
        <div>
          <Button onClick={() => view.close()} appearance="subtle">
            Cancel
          </Button>

          <Button
            onClick={async () => {
              await invoke('updateIssue', { description, summary });
              view.close();
            }}
            appearance="primary"
            autoFocus
            // isDisabled={isAnnotating && isDisabled}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
