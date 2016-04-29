'use strict';

const Comments = require('../models/comments')

export postComment = (request, reply) => {
  let username = request.payload.username
  let content = request.payload.content
  let productId = request.params.id

  Comments.createComment(username, content, productId).then((values) => {
    return reply(JSON.stringify(values))
      .type('application/json')
  }).catch((err) => {
    return reply(JSON.stringify({}))
      .type('application/json')
  })
}