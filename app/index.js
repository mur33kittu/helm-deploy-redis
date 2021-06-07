const express = require ('express');
const bodyParser = require ('body-parser');
const Redis = require ('ioredis');
let redis = {};
let config = {
  sentinels: [
    {
      host: '127.0.0.1',
      port: 9736,
    },
  ],
  name: 'sentinelmaster',
};
config = {
    host: '127.0.0.1',
    port: 9736,
    password: 'redis123'
}
// try {
  console.log ('trying');
  redis = new Redis (config);

  redis.on ('error', error => {
    console.log ('here=', error.message);
    console.log ('Error opening connection');
  });

  redis.once ('connect', () => {
    console.log ('Connection established');
  });

  redis.once ('ready', () => {
    console.log ('Connection ready');    
    // redis.disconnect ();
  });

  redis.once ('close', () => {
    console.log ('Connection closed');
  });

  redis.once ('end', () => {
    console.log ('Connection ended');
  });

  redis.once ('reconnecting', () => {
    console.log ('Reconnecting');
  });

  redis.once ('connecting', () => {
    console.log ('connecting');
  });
//   console.log(redis)

// } catch (e) {
//   console.log (e);
// }
const app = express ();

app.use (bodyParser.json ());

app.get ('/ping', (req, res) => {
  redis.get ('a').then (val => console.log ('val=' + val));
  return res.json ({
    message: redis.get ('a'),
  });
});

app.set('/setData', (req,res) => {
    redis.set(a, "from index")
    return res.send('success')
})

app.get('/getData', (req,res) => {
    res.send(redis.get(a, "from index"))
    
})
app.get ('/', (req, res) => {
  return res.send ('This page is rendered from App');
});

app.listen (3000, () => {
  console.log ('Server is listening in port 3000');
});
