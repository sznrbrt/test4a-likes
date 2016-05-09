'use strict';

var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.status(err ? 400 : 200).send(err || posts);
  });
});

router.post('/', (req, res) => {
  Post.createPost(req.body, (err, post) => {
    res.status(err ? 400 : 200).send(err || post);
  });
});

router.post('/:postId/like/:userId', (req, res) => {
  var userId = req.params.userId;
  var postId = req.params.postId;
  console.log(postId, userId);
  Post.findById(postId, (err, post) => {
    post.toogleLike(userId, (err, savedPost) => {
      res.status(err ? 400 : 200).send(err || savedPost);
    });
  })
});


module.exports = router;
