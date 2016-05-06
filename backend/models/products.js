'use strict';

const pool = require('./db')


class Product {
  static getProducts(offset, limit) {
    return new Promise((resolve, reject) => {
      offset = (offset - 1) * limit
      let sql = 'select * from product limit ?, ?'
      pool.query(sql, [offset, limit], (err, rows, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static getProductsByType(type, offset, limit) {
    return new Promise((resolve, reject) => {
      offset = (offset - 1) * limit
      type = parseInt(type, 10)
      let sql = 'select * from product where type = ? limit ?, ?'
      pool.query(sql, [type, offset, limit], (err, rows, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static getProductById(productId) {
    return new Promise((resolve, reject) => {
      let sql = 'select * from product where id = ?'
      pool.query(sql, [productId], (err, rows, fields) => {
        if (err) {
          reject(err)
        } else {
          if (rows.length > 0) {
            resolve(rows[0])
          } else {
            resolve([])
          }
        }
      })
    })
  }

  static incrCommentCount(productId) {
    return new Promise((resolve, reject) => {
      let sql = 'select comment_count, rate from product where id = ?'
      pool.query(sql, [productId], (err, rows, fields) => {
        if (err) {
          reject(err)
        } else {
          if (rows.length) {
            let tmp = rows[0]
            tmp.comment_count += 1
            sql = 'update product set comment_count = ? where id =?'
            pool.query(sql, [tmp.comment_count, productId], (err, rows, fields) => {
              if (err) {
                reject(err)
              } else {
                resolve(tmp.comment_count)
              }
            })
          }
        }
      })
    })
  }

  static getProductsNumByType(type) {
    return new Promise((resolve, reject) => {
      type = parseInt(type, 10)
      let sql = 'select count(*) as num from product where type = ?'
      pool.query(sql, [type], (err, rows, fields) => {
        if (err) {
          resolve(0)
        } else {
          resolve(rows[0].count)
        }
      })
    })
  }

  static getProductsNum() {
    return new Promise((resolve, reject) => {
      let sql = 'select count(*) as num from product'
      pool.query(sql, (err, rows, fields) => {
        if (err) {
          resolve(0)
        } else {
          resolve(rows[0].count)
        }
      })
    })
  }
}

module.exports = Product
