import Resolver from '@forge/resolver';
import axios from 'axios';
import api, { requestJira, route } from '@forge/api';

export const BASE_URL = `https://jsonplaceholder.typicode.com/`;
const API = axios.create({ baseURL: BASE_URL });

const resolver = new Resolver();

// this resolver helps get the current issue details by taking in issueKey as payload
// https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-get
resolver.define('getIssue', async (req) => {
  try {
    const issueKey = req.context.extension.issue.key;
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/issue/${issueKey}?fields=summary,description`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});

// this resolver helps update summary and description by taking in issue key, updated summary and description as payload
// https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-put

resolver.define('updateIssue', async (req) => {
  try {
    const { summary, description } = req.payload;

    const issueKey = req.context.extension.issue.key;
    const response = await api
      .asApp()
      .requestJira(route`/rest/api/2/issue/${issueKey}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            description,
            summary,
          },
        }),
      });
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
});

resolver.define('getPostData', async (req) => {
  const { postId } = req.payload;
  try {
    const res = await API.get(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const handler = resolver.getDefinitions();
