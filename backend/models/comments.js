'use strict';

const pool = require('./db')


class Comment {
  static getComments(productId, offset, limit) {
    return new Promise((resolve, reject) => {
      offset = (offset - 1) * limit
      let sql = 'select * from comment where product_id = ? limit ?, ?'
      pool.query(sql, [productId, offset, limit], (err, rows, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static createComment(username, content, productId) {
    return new Promise((resolve, reject) => {
      let created_at = Math.floor((new Date()).getTime() / 1000)
      let values = {
        username: username,
        content: content,
        product_id: productId,
        created_at: created_at
      }
      let sql = 'insert into comment set ?'
      pool.query(sql, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          values.id = result.insertId
          resolve(values)
        }
      })
    })
  }

  static getCommentsNumber(productId) {
    let sql = 'select count(*) from comment where product_id = ?'
    return new Promise((resolve, reject) => {
      pool.query(sql, [productId], (err, rows, fields) => {
        if (err) {
          reject(0)
        } else {
          resolve(rows[0])
        }
      })
    })
  }
}

module.exports = Comment
