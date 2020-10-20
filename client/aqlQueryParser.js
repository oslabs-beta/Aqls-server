import { v4 as uuidv4 } from 'uuid';
import * as timesync from 'timesync';

/* aqlQueryParser uses classic iterative parsing to extract the resolver from the query,
inject a correctly formatted AQL containing the resolver into the body of the query arguments.*/

// create timeSync object
const ts = timesync.create({
  server: '/analytics/timesync',
  interval: 10000,
});

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
      returnQuery += `, aql: {mutationSendTime: "${ts.now()}",
      mutationReceived: "",
      subscriberReceived: "",
      mutationId: "${uuidv4()}",
      resolver: "${resolver}"}`;
    }
    if (queryString[i] === '{' && !resolverFound) {
      inResolver = true;
    }
    returnQuery += queryString[i];
  }
  return returnQuery;
}

export default aqlQueryParser;
