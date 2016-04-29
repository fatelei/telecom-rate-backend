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
      let sql = 'select comment_count from product where id = ?'
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
                resolve(tmp)
              }
            })
          }
        }
      })
    })
  }
}

module.exports = Product
