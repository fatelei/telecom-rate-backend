'use strict';

const querystring = require('querystring')
const url = require('url')

exports.generatePaging = (host, path, params) => {
  return url.format({
    protocol: 'http',
    host: host,
    pathname: path,
    query: params 
  })
}