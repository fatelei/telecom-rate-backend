'use strict';

const Hapi = require('hapi');
const products = require('./apis/products')
const comments = require('./apis/comments')


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
  host: '0.0.0.0',
  port: 5000,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true
    }
  }
})

// Add the route
server.route({
  method: 'GET',
  path: '/products', 
  handler: products.getProducts
})

server.route({
  method: 'GET',
  path: '/products/{id}',
  handler: products.getProductById
})

server.route({
  method: 'POST',
  path: '/products/{id}/comments',
  handler: comments.postComment
})

server.route({
  method: 'PUT',
  path: '/products/{id}/rate',
  handler: products.incrRate
})

server.route({
  method: 'GET',
  path: '/products/{id}/comments',
  handler: products.getComments
})

module.exports = server
