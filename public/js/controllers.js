'use strict';

var app = angular.module('likeApp');

app.controller('homeCtrl', function($scope, Users, $state) {
  console.log('homeCtrl');
  $scope.user = {};
  $scope.loggingin = false;
  $scope.openRegister = () => {
    $scope.registering = true;
    $scope.loggingin = false;
  }
  $scope.openLogin = () => {
    $scope.registering = false;
    $scope.loggingin = true;
  }

  $scope.login = () => {
    Users.login($scope.user)
      .then(res => {
        $state.go('posts');
        console.log('Logged in!');
      })
  }

  $scope.logOut = () => {
    Users.logout()
      .then(res => {
        $state.go('home');
        console.log('Logged out!');
      })
  }

  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2) {
        $scope.user.password = '';
        $scope.user.password2 = '';
        alert('Passwords must match.')
      } else {
        Users.register($scope.user)
          .then(res => {
            return Users.login($scope.user);
          })
          .then(res => {
            $state.go('posts');
            console.log('Logged in!');
          })
          .catch(res => {
            alert(res.data.error);
          });
      }
  }
});
app.controller('postsCtrl', function($scope, Posts, $state, Users) {
  console.log('postsCtrl');
  $scope.posts = [];
  $scope.post = {};
  $scope.creatingPost = false;
  $scope.$watch(function() {
    return Users.currentUser;
  }, function(newVal, oldVal) {
    $scope.currentUser = newVal;
  });

  Posts.getAll()
    .then(res => {
      $scope.posts = res.data;
      console.log($scope.posts);
    })
  $scope.openCreatePost = () => {
    $scope.creatingPost = true;;
  }

  $scope.cancel = () => {
    $scope.creatingPost = false;
    $scope.post = {};
  }

  $scope.logOut = () => {
    Users.logout()
      .then(res => {
        $state.go('home');
        console.log('Logged out!');
      })
  }

  $scope.createPost = () => {
    $scope.post.createdBy = $scope.currentUser;
    Posts.createPost($scope.post)
      .then((res) => {
        Posts.getAll()
          .then(res => {
            $scope.posts = res.data;
            console.log($scope.posts);
          })
      })
  }

  $scope.likePost = (postId) => {
    var userId = $scope.currentUser;

    Posts.toogleLike(postId, userId)
      .then(res => {
        Posts.getAll()
          .then(res => {
            $scope.posts = res.data;
            console.log($scope.posts);
          })
      })
  }
});
