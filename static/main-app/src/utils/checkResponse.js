/**
 * Checks if a response was successful, and log and throw an error if not.
 * Also logs the response body if the DEBUG_LOGGING env variable is set.
 * @param apiName a human readable name for the API that returned the response object
 * @param response a response object returned from `api.fetch()`, `requestJira()`, or similar
 */

export const checkResponse = async (apiName, response) => {
  if (!response.ok) {
    const message = `Error from ${apiName}: ${
      response.status
    } ${await response.text()}`;
    console.error(message);
    throw new Error(message);
  } else if (process.env.DEBUG_LOGGING) {
    console.debug(`Response from ${apiName}: ${await response.text()}`);
  }
};
