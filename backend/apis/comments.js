'use strict';

const Comments = require('../models/comments')
const Product = require('../models/products')

exports.postComment = (request, reply) => {
  let username = request.payload.username
  let content = request.payload.content
  let productId = request.params.id

  let p1 = Comments.createComment(username, content, productId)
  let p2 = Product.incrCommentCount(productId)

  Promise.all([p1, p2]).then((values) => {
    return reply(JSON.stringify(values))
      .type('application/json')
  }).catch((err) => {
    console.error(err)
    return reply(JSON.stringify({}))
      .type('application/json')
  })
}