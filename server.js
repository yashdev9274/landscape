#!/usr/bin/env node
const https = require('https');

const req = https.request('https://raw.githubusercontent.com/cncf/landscapeapp/master/netlify/server.js', function(res) {
  process.on('SIGINT', function() {
    console.log("Caught interrupt signal. Exiting...");
    process.exit();
  });

  let script = '';
  res.on('data', (chunk) => script += chunk);
  res.on('end', () => {
    try {
      setTimeout(() => {
        console.error('Script execution timed out');
        process.exit(1);
      }, 1000); // Set timeout to 1 second
      eval(script);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

req.end();
