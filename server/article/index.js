const db = require('./../db')

const dbTable = 'article'

const where = ' where 1=1 '

// 获取文章列表
const articleListSQL = function (params) {
  let sql = `select * from ${dbTable} ${where} `
  let sqlParams = []

  // if (params.type) {
  //   sql += 'AND type = ? '
  //   sqlParams.push(params.type)
  // }
  // if (params.state) {
  //   sql += 'AND state = ? '
  //   sqlParams.push(params.state)
  // }
  if (!params.pn) {
    params.pn = 0
  }
  if (!params.pl) {
    params.pl = 10
  }
  sql += `order by id desc limit ${params.pn * params.pl},${params.pl}`

  return {
    sql, sqlParams
  }
}

// 获取单个文章
const articleDetailSQL = function (params) {
  let sql = `select * from ${dbTable} ${where} `
  let sqlParams = []

  if (params.id) {
    sql += 'AND id = ? '
    sqlParams.push(params.id)
  }

  return {
    sql, sqlParams
  }
}


module.exports = {
  async articleList(params, getObj) {
    let data = await db.query(articleListSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  },
  async articleDetail(params, getObj) {
    let data = await db.query(articleDetailSQL(params), getObj)
    return {
      code: 0,
      msg: 'success',
      data: data
    }
  }
}