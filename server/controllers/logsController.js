//will require database model for logs
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' })

const logsController = {};

logsController.getElasticLogs = async (req, res, next) => {
    console.log("hit elastic")
    
    client.search({
        index: 'total-logs',
        size: 100,
        body: { query: {
            match: { 'type': 'server' }
           }}
      },(err, result) => {
        if (err) console.log(err)
        else {
            res.locals.elastic = result.body.hits.hits;
            next();
        }
      })
}
module.exports = logsController;