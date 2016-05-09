'use strict';

var app = angular.module('likeApp');

app.service('Users', function($http) {

  this.register = (newUserObj) => {
    return $http.post('./api/users/register', newUserObj);
  }

  this.login = (loginDetailsObj) => {
    return $http.post('./api/users/login', loginDetailsObj)
      .then(res => {
        this.currentUser = res.data;
      });
  }
  this.logout = () => {
    this.currentUser = null;
    return $http.delete('./api/users/logout');
  }

  this.loadprofile = () => {
    return $http.get('./api/users/profile');
  }

  this.editprofile = (editedUserObj) => {
    return $http.put('./api/users/profile', editedUserObj);
  }

  this.getPeople = () => {
    return $http.get('./api/users/people');
  }

  this.getPerson = (id) => {
    return $http.get('./api/users/people/' + id);
  }

})

app.service('Posts', function($http) {

  this.getAll = () => {
    return $http.get('./api/posts');
  }

  this.createPost = (postObj) => {
    return $http.post('./api/posts', postObj);
  }

  this.toogleLike = (postId, userId) => {
    return $http.post(`./api/posts/${postId}/like/${userId}`);
  }

})

app.service('StoreData', function() {
  var storeData = {};
  this.get = () => { return storeData }
  this.set = (data) => { storeData = data }
})
