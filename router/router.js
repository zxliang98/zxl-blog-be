const express = require('express')
const router = express.Router()

const articleManage = require('./../server/article')
const catalogManage = require('./../server/catalog')

// 获取所有文章 articleList
router.get('/article-list', async (req, res, next) => {
  let data = await articleManage.articleList(req.query)
  res.send(data)
})

// 获取单个文章 articleDetail
router.get('/article', async (req, res, next) => {
  let data = await articleManage.articleDetail(req.query, true)
  res.send(data)
})

// 添加文章 articleAdd
router.post('/article', async (req, res, next) => {
  let data = await articleManage.articleAdd(req.body)
  res.send(data)
})

// 添加文章 articleAdd
router.put('/article', async (req, res, next) => {
  let data = await articleManage.articleEdit(req.body)
  res.send(data)
})

// 删除文章 articleDelete
router.delete('/article', async (req, res, next) => {
  let data = await articleManage.articleDelete(req.body)
  res.send(data)
})

// 获取所有分类 catalogList
router.get('/catalog-list', async (req, res, next) => {
  let data = await catalogManage.catalogList(req.query)
  res.send(data)
})

// 添加分类 catalogAdd
router.post('/catalog', async (req, res, next) => {
  let data = await catalogManage.catalogAdd(req.body)
  res.send(data)
})

// 删除分类 catalogDel
router.delete('/catalog', async (req, res, next) => {
  let data = await catalogManage.catalogDel(req.body)
  res.send(data)
})


module.exports = router