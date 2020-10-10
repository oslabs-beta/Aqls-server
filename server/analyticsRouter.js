const express = require('express');
const router = express.Router();

function analyticsRouter(traql) {

  return router.post(
  '/',
  (req, res, next) => {

    //Looks for mutation ID in the traql object 
      //pushes the number of aqls received back pertaining to its mutation ID
    traql[req.body.mutationId].aqlsReceivedBack.push(req.body);
    return next();
  },
  (req, res) => {
    res.sendStatus(200);
  }
 );
};

module.exports = analyticsRouter;