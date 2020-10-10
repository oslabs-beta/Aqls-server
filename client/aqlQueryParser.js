import { v4 as uuidv4 } from 'uuid';

/* aqlQueryParser uses classic iterative parsing to extract the resolver from the query, 
inject a correctly formatted AQL containing the resolver into the body of the query arguments.

TODO: 
- Line 35, Pass in userToken
- Update necessary to accept non-string query args
*/

function aqlQueryParser(queryString) {
  let returnQuery = '';
  let inResolver = false;
  let resolver = '';
  let inArgs = false;
  let resolverFound = false;
  for (let i = 0; i < queryString.length; i++) {
    if (inResolver && (queryString[i] === '{' || queryString[i] === '(')) {
      resolverFound = true;
      inResolver = false;
    }
    if (inResolver) {
      resolver += queryString[i];
    }
    if (queryString[i] === '(') {
      inArgs = true;
    }
    if (queryString[i] === ')' && inArgs) {
      //inject aql
      returnQuery += `, aql: {mutationSendTime: "${Date.now()}",
      mutationReceived: "",
      subscriberReceived: "",
      mutationId: "${uuidv4()}",
      resolver: "${resolver}",
      userToken: "testingHooks"}`;
    }
    if (queryString[i] === '{' && !resolverFound) {
      inResolver = true;
    }
    returnQuery += queryString[i];
  }
  return returnQuery;
}

export default aqlQueryParser;
