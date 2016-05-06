'use strict';

const pool = require('./db')


class ProductRate {
  static calculateRate(productId, rate) {
    return new Promise((resolve, reject) => {
      let sql = 'select rate_total, rate_count from product_rate where product_id = ?'
      pool.query(sql, [productId], (err, rows, fields) => {
        if (err) {
          reject(err)
        } else {
          if (rows.length) {
            let tmp = rows[0]
            tmp.rate_total += rate
            tmp.rate_count += 1
            let rst = Math.floor(tmp.rate_total / tmp.rate_count)

            sql = 'update product_rate set rate_total = ?, rate_count = ? where product_id = ?'
            pool.query(sql, [tmp.rate_total, tmp.rate_count, productId], (err, rows, fields) => {
              resolve(rst)
            })
          } else {
            let values = {
              product_id: productId,
              rate_count: 1,
              rate_total: rate
            }

            sql = 'insert into product_rate set ?'
            pool.query(sql, values, (err, rows, fields) => {
              resolve(rate)
            })
          }
        }
      })
    })
  }
}

module.exports = ProductRate
