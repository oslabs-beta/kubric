import express from 'express';
import pino  from 'pino';
import fetch from 'node-fetch';

const app = express();
const logger = pino({
        
        level:'info',
        timestamp: () => `,"time":"${new Date().toISOString()}"`
});

logger.info('Prepare for dog breeds')

const dogBreeds = () =>{
    fetch('https://api.thedogapi.com/v1/images/search',{
        headers:{'Content-Type' : 'application/json'}
    })
    .then(res=>res.json())
    .then(res=>{
        logger.info(res[0].breeds[0].name)
    })
    .catch((error)=>{console.log("caught error:",error)})
}
setInterval(dogBreeds,20000);

app.listen(3000,function(){
    logger.info("app listening on port 3000")
})