function newTraqlEntry(traql, args, pubsub) {
  /* Create a new entry in the traql that has a mutationId as its argument and an object as its key.
  The object will have the resolver data, a timestamp, and the expected number of aqls. */

  traql[args.aql.mutationId] = {
    resolver: args.aql.resolver,
    openedTime: Date.now(),
    expectedNumberOfAqls: Math.floor(
      Object.keys(pubsub.subscriptions).length / traql.subResolvers
    ),
    aqlsReceivedBack: [],
    userToken: traql.userToken,
  };
}
module.exports = newTraqlEntry;
