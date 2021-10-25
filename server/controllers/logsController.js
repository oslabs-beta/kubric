//will require database model for logs
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' })

const logsController = {};
//TO ADD:add time window property
logsController.getAppLogs = (req, res, next) => {
    const {name,field,value,all} = req.query;
    console.log("from log controller",req.query)
    let matchObj = {}
    let queryObj = {}
    let termArray = [];
    if(value){
        const tokenize = (sentence) =>{
            sentence.split(' ').forEach((word)=>{
                let termObj = {"term":{}}
                word=word.replace(/[\W_]+/g,' ').trim();
                if(word.split(' ')[0]!==word) tokenize(word)
                else {
                    termObj.term[field] = word.toLowerCase()
                    termArray.push(termObj)
                }; 
            })
        }
        tokenize(value);
    }
    matchObj.bool = {};
    matchObj.bool.should = termArray;
    matchObj.bool.minimum_should_match = termArray.length;
    console.log("matchObj",JSON.stringify(matchObj));
    
    if(all==='true') queryObj.match_all = {};
    else queryObj = matchObj;
   
    console.log("queryObj in back",JSON.stringify(queryObj))
    client.search({
        index: name,
        size: 50,
        body: { 
            // sort : [
            //     { "time" : {"order" : "desc", "format": "strict_date_optional_time_nanos"}},
            //   ],
            query: queryObj }
      },(err, result) => {
        if (err) {
            console.log("error",err)
            next({'error':err})
        }
        else {
            res.locals.appLogs = result.body.hits.hits;
            next();
        }
      })
}

logsController.getIndices = (req,res,next) => {
client.cat.indices({
    format: 'json'  
},(err,result)=>{
    if (err) next({'error':err})
    else {
        const indices = []
        result.body.forEach((indexObj)=>{
            if(indexObj.index!=='.geoip_databases') indices.push(indexObj.index);
        })
         res.locals.appIndices = indices;
         next();
    }
})
}

logsController.getAppFields = (req,res,next) => {
client.indices.getMapping({
    index: res.locals.appIndices
},(err,result)=>{
    if (err) {
        console.log("error",err)
        next({'error':err})
    }
    else {
        const fieldsObj = {}
        for(entry in result.body){
        fieldsObj[entry] = flattenLogFields(result.body[entry].mappings.properties)
        }
        res.locals.appFields = fieldsObj;
        next();
    }
})
}
const flattenLogFields = (fields) => {
    const fieldKeys = [];
    const nested = (input) => {
        for(key in input){
            if(input[key].properties){
                const keys = Object.keys(input[key].properties)
                const nestedKeyStrings = keys.map((elem)=>{
                    return `${key}.${elem}`
                })
                fieldKeys.push(nestedKeyStrings);
            } 
            else(fieldKeys.push(key));
        }
    }
    nested(fields);
return fieldKeys.flat();
}
// curl -X GET "localhost:9200/loggen-logs/_analyze?pretty" -H 'Content-Type: application/json' -d'
// {
//   "field": "message",
//   "text": "loaded module [ingest-common]"
// }
// '

module.exports = logsController;