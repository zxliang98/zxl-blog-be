const db = require('./../db')

const utils = require('./../utils')
const tools = require('./../tools')

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
    sql,
    sqlParams
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
    sql,
    sqlParams
  }
}

// 新建文章
const articleAddSQL = function (params) {
  let sql = `insert into ${dbTable} (title, content) values(?,?) `
  let sqlParams = []

  sqlParams.push(params.title)
  sqlParams.push(params.content)

  return {
    sql,
    sqlParams
  }
}

// 删除文章
const articleDeleteSQL = function (params) {
  let sql = `delete from ${dbTable} ${where}`
  let sqlParams = []

  sql += 'AND id = ? '
  sqlParams.push(params.id)

  return {
    sql,
    sqlParams
  }
}


module.exports = {
  async articleList(params, getObj) {
    let data = await db.query(articleListSQL(params), getObj)
    let count = await tools.getCount(dbTable, params)
    return utils.returnObj(data, count)
  },
  async articleDetail(params, getObj) {
    let data = await db.query(articleDetailSQL(params), getObj)
    return utils.returnObj(data)
  },
  async articleAdd(params, getObj) {
    await db.query(articleAddSQL(params), getObj)
    let max = await tools.getMaxId(dbTable, params)
    return utils.returnObj(max)
  },
  async articleDelete(params, getObj) {
    try {

      let data = await db.query(articleDeleteSQL(params), getObj)
      let count = await tools.getCount(dbTable, params)
      return utils.returnObj(count)
    } catch (error) {
      console.log(error);
      return utils.returnObj()
    }
  }
}