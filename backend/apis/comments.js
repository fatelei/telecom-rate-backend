'use strict';

const Comments = require('../models/comments')
const Product = require('../models/products')

exports.postComment = (request, reply) => {
  let username = request.payload.username
  let content = request.payload.content
  let productId = request.params.id

  Comments.createComment(username, content, productId).then((values) => {
    Product.incrCommentCount(productId).then((product) => {
      return reply(JSON.stringify(values))
        .type('application/json')
    }).catch((err) => {
      return reply(JSON.stringify({}))
        .type('application/json')
    })
  }).catch((err) => {
    return reply(JSON.stringify({}))
      .type('application/json')
  })
}