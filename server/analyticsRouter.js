const express = require('express');
const router = express.Router();
const timesyncServer = require('timesync/server');

/* Looks for mutation ID in the traql object and pushes the number
    of aqls received back pertaining to its mutation ID */

function analyticsRouter(traql) {
  router.post(
    '/',
    (req, res, next) => {
      traql[req.body.mutationId].aqlsReceivedBack.push(req.body);
      return next();
    },
    (req, res) => {
      res.sendStatus(200);
    }
  );
  router.post('/timesync', timesyncServer.requestHandler);
  return router;
}

module.exports = analyticsRouter;
