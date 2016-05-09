'use strict';

var app = angular.module('likeApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: '/html/home.html',
      controller: 'homeCtrl'
    })
    .state('posts', {
      url:'/posts',
      templateUrl: '/html/posts.html',
      controller: 'postsCtrl'
    })

  $urlRouterProvider.otherwise('/');
});
