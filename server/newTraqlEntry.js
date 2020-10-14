const { timeStamp } = require("console");

function newTraqlEntry(traql, args, pubsub) {
  /* Create a new entry in the traql that has a mutationId as its argument and an object as its key.
  The object will have the resolver data, a timestamp, and the expected number of aqls. */
  
  traql[args.aql.mutationId] = {
    resolver: args.aql.resolver,
    openedTime: Date.now(),
    expectedNumberOfAqls: Object.keys(pubsub.subscriptions).length / traql.subResolvers,
    aqlsReceivedBack: [],
    userToken: args.aql.userToken,
  };
}


let traql = { subResolvers: 2 };
let args = { aql: { mutationId: 1, resolver: 'resolver', userToken: 2 } };
let pubsub = { subscriptions: { key1: 1, key2: 2, key3: 3 } };

delete args.aql.userToken;
newTraqlEntry(traql, args, pubsub);
console.log(traql[1].userToken);

module.exports = newTraqlEntry;