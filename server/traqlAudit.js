const db = require('./models.js');

/* traqlAudit runs through each traql entry to audit if all expected aqls have been
 received back. If they have, it sends aqls to database, otherwise if there is an
error, it marks the entry as "on probation", if an entry is on probation and there
is an error, an error entry is sent to database declared in Models file. */

let open = true;
function traqlAudit(traql) {
  if (open) {
    open = false;
    if (Object.keys(traql).length > 1) {
      for (let key in traql) {
        if (key !== 'subResolvers' && traql[key].expectedNumberOfAqls >= 1) {
          if (
            traql[key].expectedNumberOfAqls ===
            traql[key].aqlsReceivedBack.length
          ) {
            //create base of query string to send all values to db
            let queryString = `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, user_token) values`;
            console.log(JSON.stringify(traql));
            //loop through aqls in mutation Id
            for (let aql of traql[key].aqlsReceivedBack) {
              //add one aql of data to query string
              queryString = queryString.concat(
                ` ('${aql.id}', '${aql.mutationSendTime}', '${aql.mutationReceived}', '${aql.subscriberReceived}', '${aql.roundtripTime}', '${aql.mutationId}', '${aql.resolver}', ${traql[key].expectedNumberOfAqls}, ${traql[key].aqlsReceivedBack.length}, '${aql.userToken}'),`
              );
            }
            //console.log('queryString before slice: ', queryString);
            queryString = queryString.slice(0, -1);
            queryString = queryString + ';';
            //console.log('queryString before call: ', queryString);
            console.log('sending successful aqls to db');
            db.query(queryString, (err, res) => {
              if (err) {
                console.log(err);
              }
            });
            //remove traql entry for mutation id
            delete traql[key];
          } else {
            console.log('in error audit');
            console.log(JSON.stringify(traql));
            // check if traql obj has "give me one more chance property"
            if (traql[key].probation) {
              //if it doesnt, give it the property and continue
              //otherwise send successful aqls to db
              for (let aql of traql[key].aqlsReceivedBack) {
                const errorQueryString = `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, error, user_token) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
                const errorQueryValues = [
                  aql.id,
                  aql.mutationSendTime,
                  aql.mutationReceived,
                  aql.subscriberReceived,
                  aql.roundtripTime,
                  aql.mutationId,
                  aql.resolver,
                  traql[key].expectedNumberOfAqls,
                  traql[key].aqlsReceivedBack.length,
                  true,
                  aql.userToken,
                ];
                console.log('i tried to send to db');
                db.query(errorQueryString, errorQueryValues, (err, res) => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
              //create error row for db with mutationID and traql stats
              const traqlErrorQueryString = `insert into Aql (mutation_id, mutation_received_time, resolver, expected_subscribers, successful_subscribers, error, user_token) values ($1, $2, $3, $4, $5, $6, $7)`;
              const traqlErrorValues = [
                key,
                traql[key].openedTime,
                traql[key].resolver,
                traql[key].expectedNumberOfAqls,
                traql[key].aqlsReceivedBack.length,
                true,
                traql[key].userToken,
              ];
              db.query(traqlErrorQueryString, traqlErrorValues, (err, res) => {
                if (err) {
                  console.log(err);
                }
              });
              //remove traql entry for mutation id
              delete traql[key];
            } else {
              traql[key].probation = true;
            }
          }
        }
      }
    }
    open = true;
  }
}
module.exports = traqlAudit;
