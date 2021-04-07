const tools = require('../tools')
const db = require('./../db')

const utils = require('./../utils')
// const tools = require('./../tools')

const dbTable = 'catalog'

const where = ' where 1=1 '

const filterList = (data, pid = 0) => {
  let result = []
  let map = {}
  data = data.map(item => {
    return {
      id: item.catalogId,
      pid: item.parentId,
      label: item.catalogName,
      des: item.describe
    }
  })
  data.forEach(item => {
    map[item.id] = item
  })
  console.log(map)
  data.forEach(item => {
    let parent = map[item.pid]
    parent
      ? (parent.children || (parent.children = [])).push(item)
      : result.push(item)
  })
  console.log(result)
  return result
}

// 目录列表
const catalogListSQL = function (params) {
  let sql = `select * from ${dbTable} ${where} `
  let sqlParams = []

  return {
    sql,
    sqlParams
  }
}

// 添加目录
const catalogAddSQL = function (params) {
  let sql = `insert into ${dbTable} (catalog_name, parent_id, ancestors) values(?,?,?)  `
  let sqlParams = []

  sqlParams.push(params.catalog_name)
  sqlParams.push(params.parent_id)
  sqlParams.push(params.ancestors)

  return {
    sql,
    sqlParams
  }
}

// 删除目录
const catalogDelSQL = function (params) {
  let sql = `delete from ${dbTable} ${where} AND catalog_id = ? `
  let sqlParams = []

  sqlParams.push(params.id - 0)

  return {
    sql,
    sqlParams
  }
}

module.exports = {
  async catalogList(params, getObj) {
    let data = await db.query(catalogListSQL(params), getObj)
    let list = filterList(data)
    return utils.returnObj(list)
  },
  async catalogAdd(params, getObj) {
    await db.query(catalogAddSQL(params), getObj)
    let num = tools.getMaxId(dbTable)
    return utils.returnObj(num)
  },
  async catalogDel(params, getObj) {
    await db.query(catalogDelSQL(params), getObj)
    let data = tools.getCount(dbTable)
    return utils.returnObj(data)
  }
}
