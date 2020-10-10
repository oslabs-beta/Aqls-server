const express = require('express');
const router = express.Router();

function analyticsRouter(traql) {
  '/',
  (req, res, next) => {

    //Looks for mutation ID in the traql object 
    traql[req.body.mutationId].aqlsReceivedBack.push(req.body);
    return next();
  },
  (req, res) => {
    res.sendStatus(200);
  };

};

module.exports = analyticsRouter;