const express = require('express')
const router = express.Router()

const articleManage = require('./../server/article')

// 获取所有文章 articleList
router.get('/article-list', async (req, res, next) => {
  let data = await articleManage.articleList(req.query)
  res.send(data)
})

// 获取单个文章 articleDetail
router.get('/article-detail', async (req, res, next) => {
  let data = await articleManage.articleDetail(req.query, true)
  res.send(data)
})

// 添加文章 articleAdd
router.post('/article', async (req, res, next) => {
  let data = await articleManage.articleAdd(req.body)
  res.send(data)
})

// 添加文章 articleDelete
router.delete('/article', async (req, res, next) => {
  let data = await articleManage.articleDelete(req.body)
  res.send(data)
})


module.exports = router