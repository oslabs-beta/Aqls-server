/* New instance of Traql object, which will be placeholder for Traql entries. 
Traql will keep track of the number of subscription resolvers in the system,
which will be used to calculate the number of current subscribers 
(subscriptions divided by number of subscription resolvers). */

function Traql(resolvers) {
  // Create subResolvers property that is equal to number of subscription resolvers in system.
  this.subResolvers = Object.keys(resolvers.Subscription).length;
};

module.exports = Traql;