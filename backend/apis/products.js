'use strict';

const Comments = require('../models/comments')
const Macro = require('../common/const')
const Product = require('../models/products')


exports.getProducts = (request, reply) => {
  let query = request.query
  let pageNum = query.page_num || 0
  let limit = query.limit || 100

  pageNum = parseInt(pageNum, 10)
  limit = parseInt(limit, 10)

  let data = {
    paging: {
      prev: '',
      next: ''
    },
    data: []
  }

  Product.getProducts(pageNum, limit).then((values) => {
    let items = []
    for (let i = 0; i < values.length; i++) {
      items.push({
        id: values[i][0],
        name: values[i][1],
        description: values[i][2],
        rate: values[i][3],
        comment_count: values[i][4],
        purchase_count: values[i][5],
        image_url: values[i][6],
        created_at: values[i][7],
        updated_at: values[i][8],
        type: Macro.product_type[values[i][9]]
      })
    }

    data.data = items
    return reply(JSON.stringify(data))
      .type('application/json')
  }).catch((err) => {
    return reply(JSON.stringify(data))
      .type('application/json')
  })
}

exports.getProductById = (request, reply) => {
  let productId = request.params.id

  Product.getProductById(productId).then((values) => {
    let data = {
      id: values[0],
      name: values[1],
      description: values[2],
      rate: values[3],
      comment_count: values[4],
      purchase_count: values[5],
      image_url: values[6],
      created_at: values[7],
      updated_at: values[8],
      type: Macro.product_type[values[i][9]]
    }

    return reply(JSON.stringify(data))
      .type('application/json')
  }).catch((err) => {
    return reply(JSON.stringify({}))
      .type('application/json')
  })
}

exports.getComments = (request, reply) => {
  let productId = request.params.id
  let query = request.query
  let pageNum = query.page_num || 0
  let limit = query.limit || 100

  pageNum = parseInt(pageNum, 10)
  limit = parseInt(limit, 10)

  let data = {
    paging: {
      prev: '',
      next: ''
    },
    total: 0,
    data: []
  }

  Comments.getComments(productId, pageNum, limit).then((values) => {
    let items = []
    for (let i = 0; i < values.length; i++) {
      items.push({
        id: values[i][0],
        content: values[i][2],
        username: values[i][3],
        created_at: values[i][4]
      })
    }

    data.data = items

    Comments.getCommentsNumber(productId).then((total) => {
      data.total = total
      return reply(JSON.stringify(data))
        .type('application/json')
    }).catch((err) => {
      return reply(JSON.stringify(data))
        .type('application/json')
    })    
  }).catch((err) => {
    return reply(JSON.stringify(data))
      .type('application/json')
  })
}