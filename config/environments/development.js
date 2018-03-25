var nconf = require('nconf');
nconf.set('NODE_PORT', '4095');
nconf.set('url', 'http://localhost');
nconf.set('secret', 'xurple-wow');
nconf.set('database', 'mongodb://localhost/dev_dB');