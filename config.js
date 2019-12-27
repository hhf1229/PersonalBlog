const fs = require('fs');
const config = fs.readFileSync('./server.conf');
const globalConfig = {};

const configs = config.toString().split('\n');


for (let i = 0; i < configs.length; i++) {
  const conf = configs[i].toString().split('=');
  globalConfig[conf[0]]= conf[1]
}
 module.exports = globalConfig;