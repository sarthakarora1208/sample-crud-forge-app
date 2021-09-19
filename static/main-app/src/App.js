import React, { useEffect, useState } from 'react';
import { invoke, requestJira } from '@forge/bridge';
import Textfield from '@atlaskit/textfield';
import Layout from './components/Layout';
import Spinner from '@atlaskit/spinner';
import { checkResponse } from './utils/checkResponse';
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';

function App() {
  const [issueKey, setIssueKey] = useState(null);
  const [summary, setSummary] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    (async () => {
      // to call get Issue Key resolver
      const key = await invoke('getIssueKey');
      setIssueKey(key);

      // Can be done using resolvers
      // TO get the issue details, i.e. summary and description
      const data = await invoke('getIssueDetails', { issueKey: key });
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
      // can also be done using requestJira from forge/bridge
      // await getIssueDetails(key);
    })();
  }, []);

  const getIssueDetails = async (currentIssueKey) => {
    const issueResponse = await requestJira(
      `/rest/api/3/issue/${currentIssueKey}?fields=summary,description`
    );

    await checkResponse('Jira API', issueResponse);
    const data = issueResponse.body;

    const { summary, description } = data.fields;

    setSummary(summary ? summary : null);

    setDescription(
      description.content[0].content[0].text
        ? description.content[0].content[0].text
        : null
    );
  };

  return (
    <Layout issueKey={issueKey} summary={summary} description={description}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {issueKey === null || summary === null || description === null ? (
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
                  <Textfield
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                )}
              </Field>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
