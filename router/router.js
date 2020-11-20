const express = require('express')
const router = express.Router()

const articleManage = require('./../server/article')

// 获取所有文章articleList
router.get('/article-list', async (req, res, next) => {
  let data = await articleManage.articleList(req.query)
  res.send(data)
})

// 获取单个文章articleDetail
router.get('/article-detail', async (req, res, next) => {
  let data = await articleManage.articleDetail(req.query, true)
  res.send(data)
})


module.exports = router