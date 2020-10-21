# Aqls


## Overview
GraphQL analytics toolkit and dashboard that integrate with Apollo Client and Apollo Server Express. It is an easy to use package that monitors GraphQL subscriptions concurrency, latency, errors, and resolver frequency. Our integrated dashboard displays your GraphQL analytics on dynamic and interactive charts. 

**Note:** Aqls is currently in BETA and improvements will continue to be implemented. If any issues are encountered while using our application, please submit a PR. 


## Requirements
- **Node.js** *version* 12.18.3+

## Install
With npm:

```
npm install --save aqls
```

## Getting Started

####
- [ ] **1**. Import Traql, traqlAudit, and analyticsRouter into your server file:

```javascript
const { Traql, traqlAudit, analyticsRouter } = require('aqls');
```
#### 

- [ ] **2**. Initialize a constant for your resolvers:
```javascript
const resolvers = { Mutation, Query, Subscription };
 ```
####
- [ ] **3**. Create a new instance of Traql passing in the resolvers and your user token:
```javascript
const traql = new Traql(resolvers, 'USER TOKEN GOES HERE IN QUOTES');
```
This will keep track of the number of subscription resolvers in the system and will calculate the number of current subscribers. You can get your User Token from [Aqls.io]() by signing up through Github Oauth. This token is needed to view your analytics in the developer dashboard at Aqls.io. 
####
- [ ] **4**. Add to your Apollo Server: 
```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db, pubsub, traql },
});
```
Make sure that *context* is added to your server.
 ####
- [ ] **5**. Invoke the traqlAudit function passing in traql: 
```javascript
setInterval(() => traqlAudit(traql), 5000);
```
traqlAudit is invoked every 5 seconds to audit each traql entry and ensure that there are no errors before sending the data to be displayed on the dashboard.
 ####
- [ ] **6**. Instantiate an endpoint to send analytics to Aqls server:
```javascript
app.use('/analytics', analyticsRouter(traql));
```
Endpoint can be anything of your choosing *('/analytics' is an example)*. Please ensure you invoke *analyticsRouter* passing in *traql*.

###
###
- [ ] **Lastly, Connect with the Aqls Team!**

aqlorgteam@gmail.com

Case Simmons: [Case's Github](https://github.com/casesimmons) and [Case's LinkedIn](https://www.linkedin.com/in/case-simmons/)

Julie Pinchak: [Julie's Github](https://github.com/jpinchak) and [Julie's LinkedIn](https://www.linkedin.com/in/julie-pinchak/)

Michael O'Halloran: [Michael's Github](https://github.com/LordRegis22) and [Michael's LinkedIn]()

Rocio Infante: [Rocio's Github](https://github.com/Rocio-Infante) and [Rocio's LinkedIn](https://www.linkedin.com/in/rocio-infante/)
