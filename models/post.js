'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var bcrypt = require('bcryptjs');

var postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

postSchema.statics.createPost = function(postObj, cb) {
  var post = new Post({
    content: postObj.content,
    createdBy: postObj.createdBy,
    createdAt: moment(),
    likes: []
  })

  post.save(cb);
}

postSchema.methods.toogleLike = function(userId, cb) {
  var idx = this.likes.indexOf(userId);
  if(idx === -1){
    this.likes.push(userId);
  } else {
    this.likes.splice(idx, 1);
  }
  this.save(cb);
};


var Post = mongoose.model('Post', postSchema);

module.exports = Post;
