const config = require('./../Config')();

const organisationType = (config && config.organisations && config.organisations.type) ? config.organisations.type : 'static';

let adapter;
switch (organisationType.toLowerCase()) {
  case 'static':
    adapter = require('./StaticServicesAdapter');
    break;
  case 'api':
    adapter = require('./ServicesApiAdapter');
    break;
  default:
    throw new Error(`Unsupported organisation type ${organisationType}. Supported types are static or api`);
}

module.exports = adapter;
