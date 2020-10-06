/* Creates a copy of the received AQL, adds a mutationReceived property of the current time,
   and returns copy to subscription payload to travel to subscribers.
*/

function newAqlPayload(args) {
  const aql = {
    ...args.aql,
    mutationReceived: new Date(),
  };
  return aql;
}
module.exports = newAqlPayload;
/* TODO Update function to take payload object and args and return payload obj including
 the updated Aql with current time stamped on it.
*/