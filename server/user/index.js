const db = require('./../db')

const utils = require('./../utils')
const tools = require('./../tools')

const dbTable = 'user'

const where = ' where 1=1 '

// 获取用户列表
const userListSQL = function (params) {
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

// 获取单个用户
const userDetailSQL = function (params) {
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

// 新建用户
const userAddSQL = function (params) {
  let sql = `insert into ${dbTable} (title, content) values(?,?) `
  let sqlParams = []

  sqlParams.push(params.title)
  sqlParams.push(params.content)

  return {
    sql,
    sqlParams
  }
}


module.exports = {
  async userList(params, getObj) {
    let data = await db.query(userListSQL(params), getObj)
    return utils.returnObj(data)
  },
  async userDetail(params, getObj) {
    let data = await db.query(userDetailSQL(params), getObj)
    return utils.returnObj(data)
  },
  async userAdd(params, getObj) {
    await db.query(userAddSQL(params), getObj)
    let max = await tools.getMaxId(dbTable, params)
    return utils.returnObj(max)
  }
}