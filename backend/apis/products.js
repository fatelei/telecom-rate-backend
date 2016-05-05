'use strict';

const Comments = require('../models/comments')
const Macro = require('../common/const')
const Product = require('../models/products')
const generatePaging = require('../utils/utils').generatePaging

const formatProduct = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    rate: product.rate,
    comment_count: product.comment_count,
    purchase_count: product.purchase_count,
    image_url: product.image_url,
    created_at: product.created_at * 1000,
    updated_at: product.updated_at * 1000,
    type: Macro.product_type[product.type]
  }
}

const formatComment = (comment) => {
  return {
    id: comment.id,
    content: comment.content,
    username: comment.username,
    created_at: comment.created_at * 1000
  }
}


exports.getProducts = (request, reply) => {
  let query = request.query
  let pageNum = query.page_num || 1
  let type = query.type
  let limit = query.limit || 10

  pageNum = parseInt(pageNum, 10)
  limit = parseInt(limit, 10)

  let host = request.info.host
  let pathname = request.path
  let before = pageNum == 1 ? pageNum : pageNum - 1
  let prev = generatePaging(host, pathname, {page_num: before, limit: limit})
  let next = generatePaging(host, pathname, {page_num: pageNum + 1, limit: limit})

  let resp = {
    paging: {
      prev: prev,
      next: next,
      is_end: true
    },
    data: []
  }

  let p1 = null
  let p2 = null
  let is_end = true

  if (type) {
    p1 = Product.getProductsByType(type, pageNum, limit)
    p2 = Product.getProductsNumByType(type)
  } else {
    p1 = Product.getProducts(pageNum, limit)
    p2 = Product.getProductsNum()
  }

  Promise.all([p1, p2]).then((values) => {
    let items = values[0]
    let total = values[1]
    let pages = Math.floor(total / 10)
    let data = []

    if (total % 10 !== 0) {
      pages += 1
    }

    if (pageNum < pages) {
      resp.paging.is_end = false
    }

    for (let i = 0; i < items.length; i++) {
      data.push(formatProduct(items[i]))
    }

    resp.is_end = is_end
    resp.data = data

    return reply(JSON.stringify(resp))
      .type('application/json')
  }).catch((err) => {
    console.error(err)
    return reply(JSON.stringify(resp))
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
      created_at: value.created_at * 1000,
      updated_at: value.updated_at * 1000,
      type: Macro.product_type[value.type]
    }

    return reply(JSON.stringify(data))
      .type('application/json')
  }).catch((err) => {
    console.error(err)
    return reply(JSON.stringify({}))
      .type('application/json')
  })
}

exports.getComments = (request, reply) => {
  let productId = request.params.id
  let query = request.query
  let pageNum = query.page_num || 1
  let limit = query.limit || 100

  pageNum = parseInt(pageNum, 10)
  limit = parseInt(limit, 10)

  let host = request.info.host
  let pathname = request.path

  let before = pageNum == 1 ? pageNum : pageNum - 1
  let prev = generatePaging(host, pathname, {page_num: before, limit: limit})
  let next = generatePaging(host, pathname, {page_num: pageNum + 1, limit: limit})

  let resp = {
    paging: {
      prev: prev,
      next: next,
      is_end: true
    },
    total: 0,
    data: []
  }

  let p1 = Comments.getComments(productId, pageNum, limit)
  let p2 = Comments.getCommentsNumber(productId)

  Promise.all([p1, p2]).then((values) => {
    let items = values[0]
    let total = values[1]
    let pages = Math.floor(total / 10)
    let data = []

    if (total % 10 !== 0) {
      pages += 1
    }

    if (pageNum < pages) {
      resp.paging.is_end = false
    }

    for (let i = 0; i < items.length; i++) {
      data.push(formatComment(items[i]))
    }

    resp.is_end = is_end
    resp.data = data
    resp.total = total

    return reply(JSON.stringify(resp))
      .type('application/json')
  }).catch((err) => {
    console.error(err)
    return reply(JSON.stringify(resp))
      .type('application/json')
  })
}