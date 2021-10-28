const express = require('express');
const path = require('path');
const app = express();
const port = 3000; //can change
const clusterRouter = require('./routes/clusterRouter');
const loginRouter = require('./routes/loginRouter');
const logsRouter = require('./routes/logsRouter');
const signUpRouter = require('./routes/signUpRouter');
const metricsRouter = require('./routes/metricsRouter');
const cors = require('cors');

// to deal with cors erros
app.use(cors());

//to parse the incoming requests with JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//render html for home and react routes
app.get(['/home','/metrics','/logs'], 
(req, res)=> {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
});
app.get('/', 
(req, res)=> {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
});

//api routers
app.use('/api/cluster', clusterRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/login', loginRouter);
app.use('/api/logs', logsRouter);
app.use('/api/metrics', metricsRouter);


//send all other end point to 404 not found
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next)=>{
  const defaultErr = {
    log: 'unknown middleware error',
    status: 400,
    message: {err: 'error occurred'}
  };
  const errorObj = {
    ...defaultErr,
    log: err.name + ' ' + err.message,
    message: {err: err.message}
  };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, ()=>console.log(`server at port ${port}`));