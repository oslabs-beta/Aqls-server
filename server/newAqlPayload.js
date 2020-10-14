const newTraqlEntry = require('./newTraqlEntry');

/* Creates a copy of the received payload, adds AQL with mutationReceived property of the 
current time, creates newTraqlEntry for this mutation, and finally returns updated payload. */

function newAqlPayload(payload, args, traql, pubsub) {
  const newPayload = {...payload};
  // Update payload to include Aql with mutationReceived property
  for(let key in newPayload) {
    newPayload[key].aql = {
      ...args.aql,
      mutationReceived: Date.now(),
    };
  }
  // Create new entry in Traql for this mutation
  newTraqlEntry(traql, args, pubsub);
  // Return updated payload
  return newPayload;
}

module.exports = newAqlPayload;