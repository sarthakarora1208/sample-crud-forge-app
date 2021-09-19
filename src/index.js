import Resolver from "@forge/resolver";
import api, { requestJira, route } from "@forge/api";
import axios from "axios";

const resolver = new Resolver();

// this resolver helps get current context details and from that we extract the current issue key
/*
 {
  issue: { key: 'HEC-1', id: '10000', type: 'Story' },
  project: { id: '10000', key: 'HEC' },
  isNewToIssue: false,
  type: 'jira:issuePanel',
  modal: {}
}
*/

resolver.define("getIssueKey", async (req) => {
  const data = req.context.extension.issue.key;
  console.log(data);
  return data;
});

// this resolver helps get the current issue details by taking in issueKey as payload
// https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-get
resolver.define("getIssueDetails", async (req) => {
  try {
    const { issueKey } = req.payload;
    const response = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/issue/${issueKey}?fields=summary,description`,
        {
          headers: {
            Accept: "application/json",
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
resolver.define("updateIssue", async (req) => {
  try {
    const { issueKey, summary, description } = req.payload;

    const response = await api
      .asApp()
      .requestJira(route`/rest/api/2/issue/${issueKey}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export const handler = resolver.getDefinitions();
