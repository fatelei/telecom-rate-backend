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
        id: values[i].id,
        name: values[i].name,
        description: values[i].description,
        rate: values[i].rate,
        comment_count: values[i].comment_count,
        purchase_count: values[i].purchase_count,
        image_url: values[i].image_url,
        created_at: values[i].created_at,
        updated_at: values[i].updated_at,
        type: Macro.product_type[values[i].type]
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

  Product.getProductById(productId).then((value) => {
    let data = {
      id: value.id,
      name: value.name,
      description: value.description,
      rate: value.rate,
      comment_count: value.comment_count,
      purchase_count: value.purchase_count,
      image_url: value.image_url,
      created_at: value.created_at,
      updated_at: value.updated_at,
      type: Macro.product_type[value.type]
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
        id: values[i].id,
        content: values[i].content,
        username: values[i].username,
        created_at: values[i].created_at
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